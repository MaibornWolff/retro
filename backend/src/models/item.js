const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  author: String,
  content: String,
  points: Number
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = { Item };