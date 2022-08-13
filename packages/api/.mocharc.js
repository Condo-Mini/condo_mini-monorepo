module.exports = {
  diff: true,
  color: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  file: ['tests/setup/index.js'],
  slow: 75,
  timeout: 20000,
  exit: !process.env.TEST_WATCH,
  ui: 'bdd',
  'watch-files': ['src/**/*.js', 'tests/**/*.js'],
  'watch-ignore': ['node_modules/'],
};
