const store = require('../store');

exports.createCard = async (req, res) => {
  const { listId, title, description } = req.body;
  if (!listId || !title) return res.status(400).json({ error: 'Missing fields' });
  const card = store.createCard({ listId, title, description });
  if (!card) return res.status(404).json({ error: 'List not found' });
  res.status(201).json(card);
};

exports.getCardsByList = async (req, res) => {
  const { listId } = req.params;
  const cards = store.getCardsByList(listId);
  res.json(cards);
};

exports.updateCard = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const updated = store.updateCard({ cardId: id, title, description });
  if (!updated) return res.status(404).json({ error: 'Card not found' });
  res.json(updated);
};

exports.moveCard = async (req, res) => {
  const { id } = req.params;
  const { targetListId } = req.body;
  if (!targetListId) return res.status(400).json({ error: 'targetListId required' });
  const moved = store.moveCard({ cardId: id, targetListId });
  if (!moved) return res.status(404).json({ error: 'Card or list not found' });
  res.json(moved);
};
