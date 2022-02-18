import RegExError from '../errors/RegExError';

export const validateExpressionPatternPolicy = (expression, pattern) => {
  const isArgValid = pattern.test(expression);

  if (!isArgValid) {
    throw new RegExError({
      expression,
      pattern,
    });
  }
};
