const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BoardSchema = new Schema({
  _id: ObjectId,
  title: String,
  items: [{ type: ObjectId, ref: "Item" }],
  columns: [{ type: ObjectId, ref: "Column" }],
  columnOrder: [ObjectId]
});

module.exports = mongoose.model("Board", BoardSchema);