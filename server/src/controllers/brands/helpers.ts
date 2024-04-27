import mongoose from 'mongoose';
import { User } from '../../db/models';

export async function getPathToBrand(id: string) {
  const [data] = await User.aggregate([
    { $unwind: '$lists' },
    { $unwind: '$lists.content' },
    { $unwind: '$lists.content.brands' },
    {
      $match: {
        'lists.content.brands._id': new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        list_id: '$lists._id',
        content_id: '$lists.content._id',
      },
    },
  ]);
  return {
    userId: data._id.toHexString(),
    listId: data.list_id.toHexString(),
    productId: data.content_id.toHexString(),
  };
}
