import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display homepage with title and navigation', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Roger Twan | Full-Stack Product Engineer/i);
    await expect(
      page.getByRole('link', { name: /Home/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /About/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Projects/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Journal/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Chat with Roger's AI/i }).first(),
    ).toBeVisible();
  });

  test('should display footer with current year', async ({ page }) => {
    await page.goto('/');
    const currentYear = new Date().getFullYear();
    await expect(
      page.getByText(`© ${currentYear} Roger Twan. All rights reserved.`),
    ).toBeVisible();
  });

  test('should have working logo link', async ({ page }) => {
    await page.goto('/about');
    const logo = page.getByRole('link', { name: /Roger Twan, homepage/i });
    await logo.click();
    await expect(page).toHaveURL('/');
  });
});
