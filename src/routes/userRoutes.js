import express from 'express';
import UserModel from '../models/UserModel';

const router = express.Router();

router.post('/', async (_req, res) => {
  const user = new UserModel({
    firstName: 'Matheus',
    lastName: 'Martino',
    subscription: {
      email: 'matheus-martino@hotmail.com',
      password: '123456',
    },
  });

  await user.save();

  res.json({ user });
});

export default router;
