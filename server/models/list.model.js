const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  date: { type: Date, default: Date.now },
  name: {
    type: String,
    required: true,
  },
  tags: Buffer,
  productList: Buffer,
});

module.exports = mongoose.model('List', listSchema);
