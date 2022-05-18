/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,

  moduleDirectories: [
    'node_modules',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setupTests.js'],
  testEnvironment: 'jsdom',
  testMatch: [
    '/**/?(*.)+(test).js?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/e2e/',
  ],
};
