const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const auth = require('../middleware/auth');

router.post('/', auth, cardController.createCard);
router.get('/:listId', auth, cardController.getCardsByList);
router.put('/:id', auth, cardController.updateCard);
router.post('/:id/move', auth, cardController.moveCard);

module.exports = router;
