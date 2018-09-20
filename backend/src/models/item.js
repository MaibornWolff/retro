const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ItemSchema = new Schema({
  _id: ObjectId,
  author: String,
  content: String,
  points: Number
});

module.exports = mongoose.model("Item", ItemSchema);