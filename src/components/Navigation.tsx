'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import IconMenu from '@public/icons/menu.svg';
import IconClose from '@public/icons/close.svg';
import IconChatbot from '@public/icons/chatbot.svg';
import IconLogo from '@public/logo.svg';

import { chatCta, navLinks } from './Footer';

export default function Navigation(props: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const threshold = 10;
    setScrolled(window.scrollY > threshold);
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
      setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const height = mobileMenuRef.current.scrollHeight;
      setMenuHeight(height);
    } else {
      setMenuHeight(0);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);
  const startsOnDarkHero =
    pathname.startsWith('/projects') ||
    pathname.startsWith('/journal') ||
    pathname.startsWith('/about') ||
    pathname === '/chat';
  const showDarkHeroNav = startsOnDarkHero && !scrolled && !isMobileMenuOpen;

  return (
    <nav
      {...props}
      ref={navRef}
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled || isMobileMenuOpen
          ? 'border-neutral-200 bg-white/95 shadow-sm backdrop-blur'
          : showDarkHeroNav
            ? 'border-white/10 bg-neutral-950/20 backdrop-blur'
            : 'border-transparent bg-white/80 backdrop-blur'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            aria-label="Roger Twan, homepage"
            className="hover:scale-110 transition-transform duration-300"
          >
            <IconLogo
              className={showDarkHeroNav ? 'text-white' : 'text-black'}
              width={40}
              height={40}
            />
          </Link>
          <div className="flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-950"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <IconClose className="size-6" aria-hidden="true" />
              ) : (
                <IconMenu className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium transition-colors duration-200 ${
                  showDarkHeroNav
                    ? 'text-white/65 hover:text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                } ${isActive(link.href) ? (showDarkHeroNav ? 'text-white' : 'text-neutral-950') : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={chatCta.href}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${
                showDarkHeroNav
                  ? 'border border-white/15 bg-white/[0.06] text-white hover:border-cyan-300/50 hover:text-cyan-100'
                  : 'bg-neutral-950 text-white hover:bg-neutral-800'
              }`}
            >
              <IconChatbot className="mr-2 size-4" />
              {chatCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="md:hidden overflow-hidden transition-[max-height] duration-200 ease-in-out bg-white border-t border-neutral-200"
        style={{ maxHeight: `${menuHeight}px` }}
        ref={mobileMenuRef}
      >
        <div className="container mx-auto px-4 pb-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base text-center font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors duration-300 ${
                isActive(link.href) ? 'text-neutral-950 bg-neutral-100' : ''
              }`}
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={chatCta.href}
            className="mt-3 flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            onClick={toggleMobileMenu}
          >
            <IconChatbot className="mr-2 size-4" />
            {chatCta.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
