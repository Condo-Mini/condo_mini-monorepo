import RegExError from '../errors/RegExError.js';

export const validateExpressionPatternPolicy = (expression, pattern) => {
  const isExpressionValid = pattern.test(expression);

  if (!isExpressionValid) {
    throw new RegExError({
      expression,
      pattern,
    });
  }
};
