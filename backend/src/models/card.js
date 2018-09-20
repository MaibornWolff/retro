const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  author: String,
  content: String,
  points: Number
});

const Card = mongoose.model("Item", CardSchema);
module.exports = { Card };