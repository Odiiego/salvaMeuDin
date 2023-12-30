const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = require('./product.model').schema;

const listSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    name: {
      type: String,
      required: true,
    },
    tags: Buffer,
    productList: [productSchema],
  },
  {
    methods: {
      async addProduct(product) {
        this.productList.push(product);
      },
      async removeBrand(product) {
        this.productList = this.productList.filter(
          (productItem) => productItem !== product,
        );
      },
    },
  },
);

module.exports = mongoose.model('List', listSchema);
