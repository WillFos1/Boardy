const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const auth = require('../middleware/auth'); // JWT auth middleware

router.post('/', auth, listController.createList);
router.get('/:boardId', auth, listController.getListsByBoard);

module.exports = router;