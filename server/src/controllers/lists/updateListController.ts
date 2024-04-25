import express from 'express';
import { getUserByListId } from './helpers';

export const updateListController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.sendStatus(400);

    const user = await getUserByListId(id);
    if (!user) return res.sendStatus(400);
    const list = user.lists.id(id)!;
    list.name = name;
    user.save();

    return res.status(200).json(list).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
