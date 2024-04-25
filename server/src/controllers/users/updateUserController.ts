import express from 'express';
import { getUserById } from './helpers';

export const updateUserController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) return res.sendStatus(400);

    const user = await getUserById(id);
    if (!user) return res.sendStatus(400);

    user.username = username;
    await user?.save();

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
