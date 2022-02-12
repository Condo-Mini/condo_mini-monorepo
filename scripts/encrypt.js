const encryptor = require('md5');
const input = process.argv[2];

if (!input) {
  console.log('No input was found to encrypt.');

  process.exit(1);
}

const encrypted = encryptor(input);

console.log(encrypted);

process.exit(0);
