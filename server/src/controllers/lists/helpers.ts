import { User } from '../../db/models';

export async function getUserByListId(id: string) {
  return await User.findOne({ 'lists._id': id });
}
