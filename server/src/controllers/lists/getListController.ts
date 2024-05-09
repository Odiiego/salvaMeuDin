import express from 'express';
import { getUserByListId } from './helpers';
import { getUserById } from '../users/helpers';
import { get } from 'lodash';

export const getListController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    if (!id) {
      const currentUserId = get(req, 'identity._id') as unknown as string;
      const currentUser = await getUserById(currentUserId);
      if (currentUser) return res.status(200).json(currentUser.lists).end();
    }

    const user = await getUserByListId(id);
    if (!user) return res.sendStatus(400);
    const list = user.lists.id(id);

    return res.status(200).json(list).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
