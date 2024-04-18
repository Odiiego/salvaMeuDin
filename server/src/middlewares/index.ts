import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/actions';

export async function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const sessionToken = req.cookies['auth'];
    if (!sessionToken) return res.sendStatus(403);

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) return res.sendStatus(403);

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function isOwner(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as unknown as string;

    if (!currentUserId) return res.sendStatus(403);
    if (currentUserId.toString() !== id) return res.sendStatus(403);

    next();
  } catch (error) {
    return res.sendStatus(400);
  }
}
