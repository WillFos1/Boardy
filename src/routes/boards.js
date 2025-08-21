const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const boardController = require('../controllers/boardController');

router.post('/', auth, boardController.createBoard);
router.get('/', auth, boardController.getBoards);
router.get('/:id', auth, boardController.getBoard);
router.patch('/:id', auth, boardController.updateBoard);
router.post('/:id/members', auth, boardController.addMember);

module.exports = router;
