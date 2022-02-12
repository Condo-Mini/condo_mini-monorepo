const encryptor = require('md5');
const input = process.argv[2];

const encrypted = encryptor(input);

console.log(encrypted);
