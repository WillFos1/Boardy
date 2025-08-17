const List = require('../models/List');
const Board = require('../models/Board');

exports.createList = async (req, res) => {
  const { boardId, title } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ error: 'Board not found' });

    const list = new List({ board: boardId, title });
    await list.save();

    board.lists.push(list._id);
    await board.save();

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.getListsByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const lists = await List.find({ board: boardId }).populate('cards');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lists', details: err.message });
  }
};