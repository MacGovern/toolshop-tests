// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 1,
  reporter: 'html',

  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    // El sitio usa el atributo "data-test" en lugar del estándar "data-testid".
    testIdAttribute: 'data-test',
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
