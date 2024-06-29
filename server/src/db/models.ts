import mongoose from 'mongoose';

export const BrandSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  metrics: {
    costPerUnit: { type: Number },
    costProjection: { type: Number },
  },
});

export const ProductSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: Number },
  brands: [BrandSchema],
  bestMetrics: {
    costPerUnit: {
      quantity: { type: Number, default: null },
      value: { type: Number, default: null },
    },
    costProjection: {
      quantity: { type: Number, default: null },
      value: { type: Number, default: null },
    },
  },
});

export const ListSchema = new mongoose.Schema({
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
