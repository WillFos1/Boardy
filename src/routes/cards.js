const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const auth = require('../middleware/auth');

router.post('/', auth, cardController.createCard);
router.get('/:listId', auth, cardController.getCardsByList);

module.exports = router;
