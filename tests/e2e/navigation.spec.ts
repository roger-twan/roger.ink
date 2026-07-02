import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  const pages = [
    { path: '/about', name: 'About' },
    { path: '/projects', name: 'Projects' },
    { path: '/journal', name: 'Journal' },
    { path: '/contact', name: 'Contact' },
  ];

  for (const { path, name } of pages) {
    test(`should navigate to ${name} page`, async ({ page }) => {
      await page.goto('/');
      await page.getByRole('link', { name }).first().click();
      await expect(page).toHaveURL(path);
      await expect(
        page.getByRole('heading', { name: new RegExp(name, 'i') }),
      ).toBeVisible();
    });
  }

  test('should have navigation menu on all pages', async ({ page }) => {
    for (const { path } of pages) {
      await page.goto(path);
      await expect(
        page.getByRole('link', { name: /Home/i }).first(),
      ).toBeVisible();
    }
  });

  test('should have footer on all pages', async ({ page }) => {
    const currentYear = new Date().getFullYear();
    for (const { path } of pages) {
      await page.goto(path);
      await expect(
        page.getByText(`© ${currentYear} Roger Twan. All rights reserved.`),
      ).toBeVisible();
    }
  });
});
