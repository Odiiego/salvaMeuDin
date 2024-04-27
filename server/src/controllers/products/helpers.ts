import mongoose from 'mongoose';
import { User } from '../../db/models';

export async function getPathToProduct(id: string) {
  const [data] = await User.aggregate([
    { $unwind: '$lists' },
    { $unwind: '$lists.content' },
    {
      $match: {
        'lists.content._id': new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        list_id: '$lists._id',
      },
    },
  ]);
  return { userId: data._id.toHexString(), listId: data.list_id.toHexString() };
}
