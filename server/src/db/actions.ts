import { User } from './models';

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
