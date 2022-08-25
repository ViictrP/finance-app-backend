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
    '!**/src/core/repositories/**.ts',
    '!**/src/core/enums/**.ts',
    '!**/src/infra/prisma.ts',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
