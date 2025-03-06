/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@src$': '<rootDir>/src/index.ts',
  },
  moduleDirectories: ['node_modules', 'src'],
  extensionsToTreatAsEsm: ['.ts'],
};
