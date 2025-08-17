const Card = require('../models/Card');
const List = require('../models/List');

exports.createCard = async (req, res) => {
  const { listId, title, description } = req.body;

  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ error: 'List not found' });

    const card = new Card({ title, description, list: listId });
    await card.save();

    list.cards.push(card._id);
    await list.save();

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.getCardsByList = async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await Card.find({ list: listId });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cards', details: err.message });
  }
};