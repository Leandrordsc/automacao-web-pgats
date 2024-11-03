const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'https://automationexercise.com',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true,
    reportDir: path.join(__dirname, 'cypress/results'), 
  },
  watchForFilesChanges: false,
});
