const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ColumnSchema = new Schema({
  title: String,
  cards: [{ type: ObjectId, ref: "Card" }]
});

const Column = mongoose.model("Column", ColumnSchema);
module.exports = { Column };