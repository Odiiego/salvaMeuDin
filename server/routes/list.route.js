const express = require('express');

const {
  getLists,
  addList,
  getList,
  addProduct,
  deleteProduct,
  addBrand,
  deleteBrand,
} = require('../controllers.js/list.controller');

const router = express.Router();

router.get('/', getLists);
router.post('/', addList);
router.get('/:listID', getList);
router.post('/:listID', addProduct);
router.post('/delete/:listID/:productID', deleteProduct);
router.post('/:listID/:productID', addBrand);
router.post('/delete/:listID/:productID/:brandID', deleteBrand);

module.exports = router;
