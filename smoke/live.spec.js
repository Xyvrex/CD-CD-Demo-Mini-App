const { test, expect } = require('@playwright/test');

test('live site loads and calculates a total', async ({ page }) => {
  await page.goto(process.env.SITE_URL);
  await page.getByLabel('Subtotal ($)').fill('100');
  await page.getByRole('button', { name: 'Calculate total' }).click();
  await expect(page.getByTestId('total')).toHaveText('Total: $108.00');
});