const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './smoke',
  retries: 3,
  reporter: [['list']],
  use: { headless: true },
});