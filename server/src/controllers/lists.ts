import express from 'express';
import { createList, getUserById } from '../db/actions';

export const addList = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await getUserById(id);
    if (!user) return res.sendStatus(400);

    const list = await createList({ name, content: [] });

    user.lists.push(list);
    await user?.save();
    console.log(user);

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
