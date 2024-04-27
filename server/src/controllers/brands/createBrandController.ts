import express from 'express';
import { getPathToProduct } from '../products/helpers';
import { getUserById } from '../users/helpers';

export const createBrandController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const { userId, listId } = await getPathToProduct(id);

    const user = await getUserById(userId);
    const list = user?.lists.id(listId);
    const product = list?.content.id(id);

    product?.brands.push({
      name,
      quantity,
      price: price * 100,
    });
    user?.save();

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
