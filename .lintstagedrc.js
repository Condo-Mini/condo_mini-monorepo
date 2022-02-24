const { CLIEngine } = require('eslint');

const cli = new CLIEngine({});

module.exports = {
  '*.js': (files) => {
    return [
      'eslint --fix --max-warnings=0 ' + files.filter((file) => !cli.isPathIgnored(file)).join(' '),
      'prettier --write ' + files.join(' '),
    ];
  },
};
