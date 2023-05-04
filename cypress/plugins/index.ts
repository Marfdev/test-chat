const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;

module.exports = (on, config) => {
    const extentededConfig = cypressFirebasePlugin(on, config,admin)
    return extentededConfig
}