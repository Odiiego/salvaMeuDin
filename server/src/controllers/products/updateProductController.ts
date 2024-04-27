import express from 'express';
import { getPathToProduct } from './helpers';
import { User } from '../../db/models';

export const updateProductController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const { userId, listId } = await getPathToProduct(id);

    const user = await User.findById(userId);
    const list = user?.lists.id(listId);
    const product = list?.content.id(id);
    if (!product) return res.sendStatus(400);

    product.name = name ? name : product.name;
    product.quantity = quantity || quantity === 0 ? quantity : product.quantity;
    user?.save();

    return res.status(200).json(product).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
