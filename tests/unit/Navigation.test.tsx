import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';

// Mock SVG imports
jest.mock('@public/icons/menu.svg', () => (props: any) => (
  <svg {...props} data-testid="menu-icon" />
));
jest.mock('@public/icons/close.svg', () => (props: any) => (
  <svg {...props} data-testid="close-icon" />
));
jest.mock('@public/icons/chatbot.svg', () => (props: any) => (
  <svg {...props} data-testid="chatbot-icon" />
));
jest.mock('@public/icons/linkedin.svg', () => (props: any) => (
  <svg {...props} data-testid="linkedin-icon" />
));
jest.mock('@public/icons/github.svg', () => (props: any) => (
  <svg {...props} data-testid="github-icon" />
));
jest.mock('@public/icons/instagram.svg', () => (props: any) => (
  <svg {...props} data-testid="instagram-icon" />
));
jest.mock('@public/icons/facebook.svg', () => (props: any) => (
  <svg {...props} data-testid="facebook-icon" />
));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import Navigation from '@/components/Navigation';

describe('Navigation', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders navigation links', () => {
    render(<Navigation />);
    // Each link appears twice (desktop and mobile menu)
    expect(
      screen.getAllByRole('link', { name: /Home/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: /About/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: /Projects/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: /Journal/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: /Contact/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', {
        name: /Chat with Roger's AI/i,
      }).length,
    ).toBeGreaterThan(0);
  });

  it('toggles the mobile menu when the menu button is clicked', () => {
    render(<Navigation />);
    const menuButton = screen.getByRole('button', { name: /Open main menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders the logo link', () => {
    render(<Navigation />);
    expect(
      screen.getByRole('link', { name: /Roger Twan, homepage/i }),
    ).toBeInTheDocument();
  });
});
