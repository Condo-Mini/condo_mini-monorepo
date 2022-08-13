import md5 from 'md5';

export const encrypt = (input) => md5(input);

export const compare = (input, encrypted) => encrypt(input) === encrypted;
