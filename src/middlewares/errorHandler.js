export default (err, _req, res, _next) => {
  const { error } = err;

  if (error) {
    const { statusCode, message } = error;

    return res.status(statusCode).json({ message });
  }

  return res.status(500).json({ message: err.message });
};
