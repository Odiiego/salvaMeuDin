const List = require('../models/list.model');
const Product = require('../models/product.model');
const Brand = require('../models/brand.model');

const getLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addList = async (req, res) => {
  const list = new List(req.body);

  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  const product = new Product(req.body);
  const list = await List.findById(req.params.listID);
  await list.addProduct(product);

  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addBrand = async (req, res) => {
  const brand = new Brand(req.body);
  const list = await List.findById(req.params.listID);
  const product = list.productList.id(req.params.productID);
  await product.addBrand(brand);

  try {
    const newBrand = await list.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getLists, addList, addProduct, addBrand };
