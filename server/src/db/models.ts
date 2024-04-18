import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { Number },
  price: { Number },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { Number },
  brands: [BrandSchema],
});

const ListSchema = new mongoose.Schema({
  name: { type: String },
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
