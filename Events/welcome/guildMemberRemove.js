const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const leaveSchema = require("../../Schemas/leaveSchema");
const { footer, botColor } = require("../../config.json");

module.exports = {
  name: "guildMemberRemove",

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const { user, guild } = interaction;

    leaveSchema.findOne({ guildId: guild.id }, (err, data) => {
      if (!data) {
        return;
      } else {
        client.channels.cache
          .get(data.channelId)
          .send({
            embeds: [
              new EmbedBuilder()
                .setColor(botColor)
                .setDescription(`**${user.username}** left **${guild.name}**`)
                .setFooter({
                  text: `${guild.name} now has ${guild.memberCount} members`,
                  iconURL: guild.iconURL(),
                }),
            ],
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  },
};
