const express = require('express');

const {
  getLists,
  addList,
  addProduct,
  addBrand,
} = require('../controllers.js/list.controller');

const router = express.Router();

router.get('/', getLists);
router.post('/', addList);
router.post('/:listID', addProduct);
router.post('/:listID/:productID', addBrand);

module.exports = router;
