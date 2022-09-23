const express = require('express');
const router = express.Router();
const typeController = require('../controllers/types');

router.get(`/getTypes`,typeController.getTypes);
router.post(`/addType`,typeController.addType);

module.exports = router; 