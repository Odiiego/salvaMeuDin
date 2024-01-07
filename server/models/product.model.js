const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = require('./brand.model').schema;

const productSchema = new Schema(
  {
    listID: String,
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    brandList: [brandSchema],
  },
  {
    methods: {
      async addBrand(brand) {
        this.brandList.push(brand);
      },
      async removeBrand(brand) {
        this.brandList = this.brandList.filter(
          (brandItem) => brandItem !== brand,
        );
      },
    },
  },
);

module.exports = mongoose.model('Product', productSchema);
