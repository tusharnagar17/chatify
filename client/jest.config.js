export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    // coverage
    coverageReporters: ["text"],
    collectCoverage: false,
    // collectCoverageFrom: ['src/components/**/*{.ts,.tsx}',  "!**/node_modules/**", '!src/__tests__/**/*.tsx'  ],
  };
  