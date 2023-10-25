import { test, expect } from '@playwright/test';

test('Has Website in Title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Website/);
});

test('Button Increments on Press', async({ page }) => {
  await page.goto('/');

  const button = await page.getByRole('button', {name: 'count'});
  await button.click();

  await expect( await button.textContent()).toContain('1')
});
