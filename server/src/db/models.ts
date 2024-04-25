import mongoose from 'mongoose';

export const BrandSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  path: {
    userId: { type: String },
    listId: { type: String },
    productId: { type: String },
  },
});

export const ProductSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: Number },
  path: { userId: { type: String }, listId: { type: String } },
  brands: [BrandSchema],
});

export const ListSchema = new mongoose.Schema({
  name: { type: String },
  path: { userId: { type: String } },
  content: [ProductSchema],
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  lists: [ListSchema],
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const User = mongoose.model('User', UserSchema);
