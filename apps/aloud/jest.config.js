module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/unit/**/*.test.js'],
  setupFilesAfterEnv: ['./tests/setup/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // Mock static assets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@babel|jest)/)'],
  collectCoverageFrom: [
    'src/content/*.js',
    'src/popup/*.js',
    'src/background/*.js',
    'src/lib/*.js',
  ],
  moduleDirectories: ['node_modules', 'src'],
};
