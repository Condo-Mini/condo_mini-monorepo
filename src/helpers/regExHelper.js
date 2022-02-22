import RegExError from '../errors/RegExError';

export const validateExpressionPatternPolicy = (expression, pattern) => {
  const isExpressionValid = pattern.test(expression);

  if (!isExpressionValid) {
    throw new RegExError({
      expression,
      pattern,
    });
  }
};
