export default (err, _req, res, _next) => {
  const { error } = err;

  if (error) {
    const { statusCode, message, errors: validationErrors } = error;

    const responseError = {
      ...(message ? { message } : {}),
      ...(validationErrors ? { errors: validationErrors } : {}),
    };

    return res.status(statusCode).json(responseError);
  }

  return res.status(500).json({ message: err.message });
};
