const { Schema, model } = require("mongoose");
const logSetup = new Schema({
  _id: Schema.Types.ObjectId,
  logsId: String,
  guildId: String
});

module.exports = model("logSetup", logSetup, "logSetup");
