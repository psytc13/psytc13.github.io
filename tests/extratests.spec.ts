import exp from 'constants';

// @ts-check
const { test, expect} = require('@playwright/test');

// change this to the URL of your website, could be local or GitHub pages
const websiteURL = 'http://127.0.0.1:3002/';

// Go to the website home page before each test.
test.beforeEach(async ({ page }) => {
   await page.goto(websiteURL);
});

test('check if all fields empty returns error', async ({page}) => {
   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.locator('#message')).toContainText('Error')
   await expect(page.locator('#results').locator('div')).toHaveCount(0)
})

test('check if missing registration number', async ({page}) => {
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.locator('#message')).toContainText('Error')
   await expect(page.locator('#results').locator('div')).toHaveCount(0)
})

test('missing information when adding vehicle', async ({page}) => {
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   await page.getByRole('button', { name: 'Add vehicle' }).click();
   await expect(page.locator('#message')).toContainText('Error')
   await expect(page.locator('#results').locator('div')).toHaveCount(0)
})

test('add vehicle when owner exists', async ({page}) => {
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   await page.locator('#rego').fill('LKJ23UO')
   await page.locator('#make').fill('Porsche')
   await page.locator('#model').fill('Taycan')
   await page.locator('#colour').fill('white')
   await page.locator('#owner').fill('Rachel')
   await page.getByRole('button', { name: 'Add vehicle' }).click();

   await expect(page.locator('#message')).toContainText('Vehicle added successfully')
})
