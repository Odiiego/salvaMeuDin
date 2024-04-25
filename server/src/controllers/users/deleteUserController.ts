import express from 'express';
import { deleteUserById } from './helpers';

export const deleteUserController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    return res.sendStatus(400);
  }
};
