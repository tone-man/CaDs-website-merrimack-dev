import { test, expect } from '@playwright/test';

test('Has Website in Title', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load'); 
  await expect(page).toHaveTitle("CaDS Website");
});


// // NAV BAR TESTS
// test('First Nav Bar Present', async ({ page }) => {
//   const pages = ['/', '/faculty', '/dashboard']
//   for (let i = 0; i < pages.length; i++) {
//     await page.goto(pages[i]);
//     await page.waitForLoadState('load'); 
//     const navbar = await page.$('#first-navbar');
//     expect(navbar).not.toBeNull();
//   }
// });

// test('Second Nav Bar Present', async ({ page }) => {
//   const pages = ['/', '/faculty', '/dashboard']
//   for (let i = 0; i < pages.length; i++) {
//     await page.goto(pages[i]);
//     await page.waitForLoadState('load'); 
//     const navbar = await page.$('#second-navbar');
//     expect(navbar).not.toBeNull();
//   }
// });

// test('Correct Nav Bar Links', async ({ page }) => {
//   await page.goto('/');

//   const home = await page.waitForSelector('#home', { state: 'visible' });
//   await home.click();
//   await page.waitForLoadState('load'); 
//   const homeUrl = page.url();
//   expect(homeUrl).toContain('/'); 

//   const dashboard = await page.waitForSelector('#dashboard', { state: 'visible' });
//   await dashboard.click();
//   await page.waitForLoadState('load'); 
//   const dashboardUrl = page.url();
//   expect(dashboardUrl).toContain('/dashboard'); 

//   const faculty = await page.waitForSelector('#faculty', { state: 'visible' });
//   await faculty.click();
//   await page.waitForLoadState('load'); 
//   const facultyUrl = page.url();
//   expect(facultyUrl).toContain('/faculty'); 
// });


// test('Search Icon Toggles Search Bar', async ({ page }) => {
//   const pages = ['/', '/faculty', '/dashboard']
//   for (let i = 0; i < pages.length; i++) {
//     await page.goto(pages[i]);
//     const searchBarToggle = await page.$('#searchBarToggle');

//      if (searchBarToggle){
//       await searchBarToggle!.click(); 
//      }

//     const isBlockStyle = await page.evaluate(() => {
//       const searchBar = document.getElementById('searchBar-container');
//       if (searchBar !== null) {
//         const computedStyle = window.getComputedStyle(searchBar);
//         return computedStyle.getPropertyValue('display') === 'block';
//       }
//       // Handle the case where searchBar is null (element not found)
//       return false;
//     });

//     // Assert that the style is 'display: block;'
//     expect(isBlockStyle).toBe(true);
//   }
// });


// test('Search Bar Value', async ({ page }) => {
//   const pages = ['/', '/faculty', '/dashboard']
//   for (let i = 0; i < pages.length; i++) {
//     await page.goto(pages[i]);
//   await page.waitForLoadState('load'); 

//     const searchBarToggle = await page.$('#searchBarToggle');

//     if (searchBarToggle) {
//       await searchBarToggle!.click();
//     }

//     const searchIcon = await page.$('searchIcon');
//     await page.fill('#search-Bar', 'Peter');
//     searchIcon?.click;
//     const searchBarValue = await page.$eval('#search-Bar', searchBar => searchBar.value);
//     expect(searchBarValue).toBe('Peter');

//   }
// });

// PROJECT LIST TESTS

// test('Correct number of project cards', async ({ page }) => {

//     await page.goto('/');

//     const projectCardElements = await page.$$('.project-row'); 
//      const numberOfProjectCards = projectCardElements.length;
//      const expectedNumberOfProjects = 4;

//      expect(numberOfProjectCards).toBe(expectedNumberOfProjects);

// });

// PROJECT CARD TEST 

// test('Correct Project Links', async ({ page }) => {});

// EVENT TEST

// test('Correct number of events in events carousel', async ({ page }) => {

//   await page.goto('/');
//   const eventElements = await page.$$('.event-card');
//   const numberOfEvents = eventElements.length;
//   const expectedNumberOfEvents = 3;

//   expect(numberOfEvents).toBe(expectedNumberOfEvents);

// });

