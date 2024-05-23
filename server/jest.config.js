module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    globalTeardown: "<rootDir>/tests/teardown.ts",
    setupFilesAfterEnv: ['./tests/setupTests.ts'], 
    testTimeout: 10000
};
  