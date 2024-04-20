import { List, User } from './models';

export function getUsers() {
  return User.find();
}

export function getUserByEmail(email: string) {
  return User.findOne({ email });
}

export function getUserBySessionToken(sessionToken: string) {
  return User.findOne({ 'authentication.sessionToken': sessionToken });
}

export function getUserById(id: string) {
  return User.findById(id);
}

export function createUser(values: Record<string, any>) {
  return new User(values).save().then((user) => user.toObject());
}

export function deleteUserById(id: string) {
  return User.findOneAndDelete({ _id: id });
}

export function updateUserById(id: string, values: Record<string, any>) {
  return User.findByIdAndUpdate(id, values);
}

export function createList(values: Record<string, any>) {
  return new List(values).save().then((list) => list.toObject());
}

export function getListById(id: string) {
  return List.findOne({ _id: id });
}

export async function updateListById(id: string, values: Record<string, any>) {
  const list = await List.findOne({ _id: id }).then((a) => a?.toObject());
  return User.findOneAndUpdate(
    { 'lists._id': id },
    { $set: { 'lists.$': { ...list, ...values } } },
  );
}
