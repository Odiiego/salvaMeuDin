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
      brands: [],
    });
    user?.save();

    const product = list?.content[list?.content.length - 1];

    return res.status(200).json(product).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
