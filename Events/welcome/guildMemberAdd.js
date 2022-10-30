const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const joinSchema = require("../../Schemas/joinSchema");
const { footer, botColor } = require("../../config.json");

module.exports = {
  name: "guildMemberAdd",

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { user, guild } = interaction;

    joinSchema.findOne({ guildId: guild.id }, async (err, data) => {
      if (!data) {
        return;
      } else {
        client.channels.cache
          .get(data.channelId)
          .send({
            embeds: [
              new EmbedBuilder()
                .setDescription(`**${user.username}** joined **${guild.name}**`)
                .setColor(botColor)
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
