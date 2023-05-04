import { defineConfig } from "cypress";
const cypressFirebasePlugin = require('cypress-firebase').plugin;
const admin = require('firebase-admin');

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:5173",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      return cypressFirebasePlugin(on, config, admin)
    }
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
