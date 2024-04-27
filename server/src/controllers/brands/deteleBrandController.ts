import express from 'express';
import { getPathToBrand } from './helpers';
import { getUserById } from '../users/helpers';

export const deleteBrandController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { userId, listId, productId } = await getPathToBrand(id);

    const user = await getUserById(userId);
    const list = user?.lists.id(listId);
    const product = list?.content.id(productId);
    const brand = product?.brands.id(id);
    if (!brand) return res.sendStatus(400);

    product?.brands.id(id)?.deleteOne();
    user?.save();

    return res.status(200).json(brand).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
