const mongoose = require('mongoose');
const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' }
});
module.exports = mongoose.model('Card', CardSchema);