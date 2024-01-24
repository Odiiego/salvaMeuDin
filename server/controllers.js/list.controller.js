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

const getList = async (req, res) => {
  try {
    const list = await List.findById(req.params.listID);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const list = await List.findById(req.params.listID);
    const product = await list.productList.id(req.params.productID);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    const newBrandList = await list.save();
    res.status(201).json(newBrandList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBrand = async (req, res) => {
  const list = await List.findById(req.params.listID);
  const product = list.productList.id(req.params.productID);
  const brand = product.brandList.id(req.params.brandID);
  product.removeBrand(brand);

  try {
    const newBrandList = await list.save();
    res.status(201).json(newBrandList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const list = await List.findById(req.params.listID);
  const product = list.productList.id(req.params.productID);
  list.removeProduct(product);

  try {
    const newBrandList = await list.save();
    res.status(201).json(newBrandList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getLists,
  getList,
  addList,
  getProduct,
  addProduct,
  addBrand,
  deleteBrand,
  deleteProduct,
};
