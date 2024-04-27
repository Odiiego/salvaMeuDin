import express from 'express';
import { getUserById } from '../users/helpers';

export const createListController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.sendStatus(400);

    const user = await getUserById(id);
    user?.lists.push({
      name,
      content: [],
    });
    user?.save();

    return res
      .status(200)
      .json(user?.lists[user.lists.length - 1])
      .end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
