const store = require('../store');

exports.createBoard = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const { board } = store.createBoard({ title, ownerId: req.user.userId });
  res.status(201).json(board);
};

exports.getBoards = async (req, res) => {
  const boards = store.listBoardsForUser(req.user.userId).map(b => ({ id: b.id, title: b.title, isPublic: b.isPublic }));
  res.json(boards);
};

exports.getBoard = async (req, res) => {
  const boardId = req.params.id;
  const board = store.getBoardWithContent(boardId);
  if (!board) return res.status(404).json({ error: 'Board not found' });
  // Access control: member or public viewer
  const isMember = board.ownerId === req.user.userId || board.members.some(m => m.userId === req.user.userId);
  if (!isMember && !board.isPublic) return res.status(403).json({ error: 'Access denied' });
  res.json(board);
};

exports.updateBoard = async (req, res) => {
  const boardId = req.params.id;
  const board = store.getBoardWithContent(boardId);
  if (!board) return res.status(404).json({ error: 'Board not found' });
  if (board.ownerId !== req.user.userId) return res.status(403).json({ error: 'Only owner can update board' });

  const { title, isPublic } = req.body;
  if (typeof title === 'string') board.title = title;
  if (typeof isPublic === 'boolean') store.setBoardPublic({ boardId, isPublic });
  const updated = store.getBoardWithContent(boardId);
  res.json(updated);
};

exports.addMember = async (req, res) => {
  const boardId = req.params.id;
  const { userId, role } = req.body;
  const b = store.getBoardWithContent(boardId);
  if (!b) return res.status(404).json({ error: 'Board not found' });
  if (b.ownerId !== req.user.userId) return res.status(403).json({ error: 'Only owner can add members' });
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const updated = store.addMember({ boardId, userId, role });
  res.json({ ok: true, board: store.getBoardWithContent(boardId) });
};
