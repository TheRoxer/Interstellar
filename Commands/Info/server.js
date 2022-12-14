const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
    botColor,
    footer,
} = require("../../config.json");

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Displays server info"),

    
    execute(interaction) {

        const { guild } = interaction;
        const { members } = guild;
        const botCount = members.cache.filter(member => member.user.bot).size;
        const embed = new EmbedBuilder()

            .setColor(botColor)
            .setTitle(`Informacje serwera ${guild.name}`)
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .setImage(guild.bannerURL({ size: 1024 }))
            .addFields(
                { name: "Description", value: `๐ ${guild.description || "None"}` },
                {
                    name: "General",
                    value: [
                        `๐ **Created** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                        `๐ณ **ID** ${guild.id}`,
                        `๐ **Owner** <@${guild.ownerId}>`,
                    ].join("\n")
                },
                {
                    name: `Users (${guild.memberCount})`,
                    value: [
                        `๐จโ๐ฉโ๐งโ๐ฆ **Members** ${guild.memberCount - botCount}`,
                        `๐ค **Bots** ${botCount}`
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
