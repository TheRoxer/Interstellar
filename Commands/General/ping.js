const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { footer, botColor } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responds with pong"),

    execute(interaction) {
        const embed = new EmbedBuilder()

            .setTitle(`🏓 Pong!`)
            .setColor(botColor)
            .setDescription(
                `Client latency is **${interaction.client.ws.ping}ms**.`
            )
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }, 
};