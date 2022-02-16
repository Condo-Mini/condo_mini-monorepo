export const interpolateTemplateStringWithArgs = (template, ...args) => {
  const placeholders = template.match(/%s/gi);

  const message = placeholders.reduce((acc, placeholder, index) => {
    return acc.replace(placeholder, args[index]);
  }, template);

  return message;
};
