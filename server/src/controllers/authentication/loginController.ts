import express from 'express';
import { authentication, random } from './helpers';
import { getUserByEmail, getUserById } from '../users/helpers';

export const loginController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password',
    );
    if (!user) return res.sendStatus(400);
    if (!user.authentication?.salt) return res.sendStatus(400);

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash)
      return res.sendStatus(403);

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );
    await user.save();

    res.cookie('auth', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    const userProfile = await getUserById(user.id);
    return res.status(200).json(userProfile).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
