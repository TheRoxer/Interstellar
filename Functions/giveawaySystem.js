const { Client } = require("discord.js");
const giveawaySchema = require("../schemas/giveawaySchema");
const { endGiveaway } = require("../Utils/GiveawayFunctions");

/**
 * @param {Client} client 
 */
module.exports = (client) => {
    giveawaySchema.find().then((schemaArray) => {
        schemaArray.forEach(async (data) => {
            if (!data) return;
            if (data.Ended === true) return;
            if (data.Paused === true) return;
            const guild = client.guilds.cache.get(data.GuildID);
            if (!guild) return;

            const message = guild.channels.cache.get(data.ChannelID)?.messages.fetch(data.MessageID);
            if (!message) return;

            if ((data.EndTime * 1000) < Date.now()) endGiveaway(message);
            else setTimeout(() => endGiveaway(message), (data.EndTime * 1000) - Date.now());
        });
    });
};