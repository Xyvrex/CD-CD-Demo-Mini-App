const { test, expect } = require('@playwright/test');

test('live site shows the checkout page and calculates correctly', async ({ page }) => {
  await page.goto(process.env.SITE_URL);

  await expect(page).toHaveTitle('Checkout');
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();

  await page.getByLabel('Subtotal ($)').fill('100');
  await page.getByRole('button', { name: 'Calculate total' }).click();
  await expect(page.getByTestId('total')).toHaveText('Total: $108.00');
});