const store = require('../store');

exports.createList = async (req, res) => {
  const { boardId, title, type, ownerUserId } = req.body;
  if (!boardId || !title) return res.status(400).json({ error: 'Missing fields' });
  const board = store.getBoardWithContent(boardId);
  if (!board) return res.status(404).json({ error: 'Board not found' });
  if (board.ownerId !== req.user.userId) return res.status(403).json({ error: 'Only owner can create lists' });
  // For demo, lists are created via store directly isn't exposed; so keep simple: not implemented
  return res.status(501).json({ error: 'Custom list creation not supported in demo' });
};

exports.getListsByBoard = async (req, res) => {
  const { boardId } = req.params;
  const board = store.getBoardWithContent(boardId);
  if (!board) return res.status(404).json({ error: 'Board not found' });
  const lists = store.listsByBoard(boardId);
  res.json(lists);
};
