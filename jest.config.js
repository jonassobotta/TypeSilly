module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    cache: true,
    transform: {
      '^.+\\.tsx?$': ['ts-jest', {
        tsconfig: 'tsconfig.json',
        diagnostics: false,
      }],
    },
    watchPathIgnorePatterns: ['<rootDir>/dist/'],
};
  