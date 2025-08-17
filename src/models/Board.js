const mongoose = require('mongoose');
const BoardSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});
module.exports = mongoose.model('Board', BoardSchema);