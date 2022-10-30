const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
    botColor,
    footer,
} = require("../../config.json");

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Displays server info"),

    
    async execute(interaction) {

        const { guild } = interaction;
        const { members } = guild;
        const botCount = members.cache.filter(member => member.user.bot).size;
        const embed = new EmbedBuilder()

            .setColor(botColor)
            .setTitle(`Informacje serwera ${guild.name}`)
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .setImage(guild.bannerURL({ size: 1024 }))
            .addFields(
                { name: "Description", value: `📝 ${guild.description || "None"}` },
                {
                    name: "General",
                    value: [
                        `📜 **Created** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                        `💳 **ID** ${guild.id}`,
                        `👑 **Owner** <@${guild.ownerId}>`,
                    ].join("\n")
                },
                {
                    name: `Users (${guild.memberCount})`,
                    value: [
                        `👨‍👩‍👧‍👦 **Members** ${guild.memberCount - botCount}`,
                        `🤖 **Bots** ${botCount}`
                    ].join("\n"),
                    inline: true
                },
            )
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp()
            .setFooter({ text: 
                footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() })

        interaction.reply({ embeds: [embed] });
    },
};
