const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFilesChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implementar event listeners aqui
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'https://automationexercise.com' 
  }
});

