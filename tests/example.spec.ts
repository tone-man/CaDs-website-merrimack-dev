import { test, expect } from '@playwright/test';

test('Has Website in Title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle("CaDS Website");
});

