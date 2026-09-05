import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://securesite-audit-frontend.onrender.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    apiUrl: 'https://securesite-audit.onrender.com/api/v1',
  },
});