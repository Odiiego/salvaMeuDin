import express from 'express';
import { getUserByListId } from './helpers';

export const deleteListController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;

    const user = await getUserByListId(id);
    const list = user?.lists.id(id);
    if (!list) return res.sendStatus(400);
    list?.deleteOne();
    user?.save();

    return res.status(200).json(list).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
