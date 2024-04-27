import express from 'express';
import { getPathToBrand } from './helpers';
import { getUserById } from '../users/helpers';

export const updateBrandController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    const { userId, listId, productId } = await getPathToBrand(id);

    const user = await getUserById(userId);
    const list = user?.lists.id(listId);
    const product = list?.content.id(productId);
    const brand = product?.brands.id(id);
    if (!brand) return res.sendStatus(400);

    brand.name = name ? name : brand.name;
    brand.quantity = quantity || quantity === 0 ? quantity : brand.quantity;
    brand.price = price || price === 0 ? price * 100 : brand.price;
    user?.save();

    return res.status(200).json(brand).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
