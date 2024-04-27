import express from 'express';
import { getPathToProduct } from './helpers';
import { User } from '../../db/models';

export const deleteProductController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;

    const { userId, listId } = await getPathToProduct(id);

    const user = await User.findById(userId);
    const list = user?.lists.id(listId);
    const product = list?.content.id(id);

    list?.content.id(id)?.deleteOne();
    user?.save();

    return res.status(200).json(product).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
