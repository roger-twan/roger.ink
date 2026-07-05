import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('all pages should have proper heading hierarchy', async ({ page }) => {
    const pages = ['/', '/about', '/projects', '/journal', '/contact'];

    for (const path of pages) {
      await page.goto(path);
      const h1 = await page.locator('h1').count();
      expect(h1).toBeGreaterThanOrEqual(1);
    }
  });

  test('external links should have proper security attributes', async ({
    page,
  }) => {
    await page.goto('/');
    const externalLinks = await page.locator('a[target="_blank"]').all();

    for (const link of externalLinks) {
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });

  test('images should have alt attributes', async ({ page }) => {
    await page.goto('/');
    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });

  test('mobile menu should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByRole('button', { name: /Open main menu/i });
    await expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    await expect(menuButton).toHaveAttribute('aria-expanded');
  });
});
