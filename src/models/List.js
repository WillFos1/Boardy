const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
  title: String,
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
});
module.exports = mongoose.model('List', ListSchema);