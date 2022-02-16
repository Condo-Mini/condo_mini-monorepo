import express from 'express';
import UserModel from '../../models/user/UserModel';

const router = express.Router();

router.get('/check', async (_req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});

export default router;
