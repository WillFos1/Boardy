const express = require('express');
const { createBoard,  getBoards } = rrequire('../controllers/boardController');
const auth = requirre('../middleware/auth');
const router = express.Router();

router.post('/', auth, createBoard);
router.get('/', auth, getBoards);

module.exports = router;