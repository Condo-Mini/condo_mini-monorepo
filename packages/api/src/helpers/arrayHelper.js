export const sanitizeSingleValueToArray = (value) =>
  Array.isArray(value) ? value : [value];
