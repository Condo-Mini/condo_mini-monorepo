import express from 'express';

const router = express.Router();

router.get('/check', (_req, res) =>
  res.status(200).json({ message: "I'm good. Thanks." })
);

export default router;
