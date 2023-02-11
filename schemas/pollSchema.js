const { Schema, model } = require("mongoose");
const pollSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: String,
  messageId: String
});

module.exports = model("pollSetup", pollSchema);
