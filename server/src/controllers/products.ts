import express from 'express';
import { createProduct, getUserByListId } from '../db/actions';

export const addProduct = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const user = await getUserByListId(id);
    if (!user) return res.sendStatus(400);
    const list = user.lists.id(id);
    if (!list) return res.sendStatus(400);

    const product = await createProduct({ name, quantity, brands: [] });

    list.content.push(product);
    await user?.save();

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
