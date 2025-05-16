const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config)
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )
  return config
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: '**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
    defaultCommandTimeout: 10000, // Increase default command timeout
    pageLoadTimeout: 60000,       // Increase page load timeout
    responseTimeout: 30000,       // Increase response timeout
    retries: {
      runMode: 2,               // Retry failed tests up to 2 times in CI
      openMode: 0               // Don't retry in open mode
    },
    video: true,               // Enable video recording
    videoCompression: 32,        // Set video compression
    chromeWebSecurity: false,    // Disable web security for cross-origin requests
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  requestTimeout: 10000,         // Global request timeout
  responseTimeout: 30000,         // Global response timeout
  numTestsKeptInMemory: 50,       // Reduce memory usage
  experimentalMemoryManagement: true, // Enable experimental memory management
  experimentalStudio: false,      // Disable experimental studio
  experimentalWebKitSupport: false, // Disable WebKit support
  experimentalRunAllSpecs: false  // Disable experimental run all specs
})
