const path = require('path')

const config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [path.join(__dirname, 'setup-testing.js')],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  testPathIgnorePatterns: ['node_modules/*']
}

module.exports = config
