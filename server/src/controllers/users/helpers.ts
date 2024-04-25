import { User } from '../../db/models';

export function createUser(values: Record<string, any>) {
  return new User(values).save().then((data) => data.toObject());
}

export function getUserBySessionToken(sessionToken: string) {
  return User.findOne({ 'authentication.sessionToken': sessionToken });
}

export function getUserByEmail(email: string) {
  return User.findOne({ email });
}

export function deleteUserById(id: string) {
  return User.findOneAndDelete({ _id: id });
}

export function getUsers() {
  return User.find();
}

export function getUserById(id: string) {
  return User.findById(id);
}
