const express = require('express');

const {
  getLists,
  getList,
  addList,
  addProduct,
  addBrand,
} = require('../controllers.js/list.controller');

const router = express.Router();

router.get('/', getLists);
router.get('/:listID', getList);
router.post('/', addList);
router.post('/:listID', addProduct);
router.post('/:listID/:productID', addBrand);

module.exports = router;
