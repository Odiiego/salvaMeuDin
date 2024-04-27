import express from 'express';
import { getUserByListId } from '../lists/helpers';

export const createProductController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const user = await getUserByListId(id);
    const list = user?.lists.id(id);
    list?.content.push({
      name,
      quantity,
      path: { ...list.path, listId: id },
      brands: [],
    });
    user?.save();

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
