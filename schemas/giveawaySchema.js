const { model, Schema } = require("mongoose");

const giveawaySchema = new Schema({
    GuildID: String,
    ChannelID: String,
    MessageID: String,
    Winners: Number,
    Prize: String,
    EndTime: String,
    Paused: Boolean,
    Ended: Boolean,
    HostedBy: String,
    Entered: [String]
});

module.exports = model("giveaway", giveawaySchema);