const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BoardSchema = new Schema({
  title: String,
  items: [{ type: ObjectId, ref: "Item" }],
  columns: [{ type: ObjectId, ref: "Column" }],
  columnOrder: [ObjectId]
});

const Board = mongoose.model("Board", BoardSchema);
module.exports = { Board };