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
    collectCoverage: false,
     collectCoverageFrom: [
       "src/**/*.{js,jsx,ts,tsx}",
       "!src/**/*.d.ts",
      "!src/index.tsx" // exclude specific files if needed
      ],
     coverageDirectory: "coverage",
   coverageReporters: ["html", "text"],
   testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ]
  };
  