const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ColumnSchema = new Schema({
  _id: ObjectId,
  title: String,
  items: [{ type: ObjectId, ref: "Item" }]
});

module.exports = mongoose.model("Column", ColumnSchema);