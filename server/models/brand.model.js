const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  listID: String,
  productID: String,
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Brand', brandSchema);
