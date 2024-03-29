/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': ['@swc/jest']
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
    '!src/routes.ts',
    '!**/src/**/index.ts',
    '!**/src/**/entities/**.ts',
    '!**/src/**/dto/**.ts',
    '!**/src/core/repositories/**.ts',
    '!**/src/core/enums/**.ts',
    '!**/src/infra/**.ts',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
