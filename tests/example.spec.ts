import { test, expect } from '@playwright/test';

test('Has Website in Title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("CaDS Website");
});


// test('First Nav Bar Present', async ({ page }) => {
//   const pages = ['/', '/faculty', '/dashboard']
//   for (let i = 0; i < pages.length; i++) {
//     await page.goto(pages[i]);
//     const navbar = await page.$('#first-navbar');
//     expect(navbar).not.toBeNull();
//   }
// });

// test('Second Nav Bar Present', async ({ page }) => {
//   const pages = ['/', '/faculty', '/dashboard']
//   for (let i = 0; i < pages.length; i++) {
//     await page.goto(pages[i]);
//     const navbar = await page.$('#second-navbar');
//     expect(navbar).not.toBeNull();
//   }
// });

// test('Search Bar Toggle', async ({ page }) => {
//   const pages = ['/', '/faculty', '/dashboard']
//   for (let i = 0; i < pages.length; i++) {
//     await page.goto(pages[i]);
//     const searchBarToggle = await page.$('#searchBarToggle');
//     expect(searchBarToggle).not.toBeNull();

//     await searchBarToggle!.click(); 
//   }
// });

