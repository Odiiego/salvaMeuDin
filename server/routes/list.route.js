const express = require('express');

const { getLists, addList } = require('../controllers.js/list.controller');

const router = express.Router();

router.get('/', getLists);
router.post('/list', addList);

module.exports = router;
