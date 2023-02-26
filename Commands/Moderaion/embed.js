const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { footer } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Embed creator")
        .addStringOption((option) => {
            return option
                .setName("title")
                .setDescription("Title of the embed")
                .setRequired(true)
        })
        .addStringOption((option) => {
            return option
                .setName("description")
                .setDescription("Description of the embed")
                .setRequired(true)
        })
        .addStringOption((option) => {
            return option
                .setName("color")
                .setDescription("Color of the embed (hex code)")
                .setRequired(true)
        }),

    execute(interaction) {


        const embedTitle = interaction.options.getString("title");
        const embedDescription = interaction.options.getString("description");
        const color = interaction.options.getString("color");

        //cehck if color is hex
        if (!/^#[0-9A-F]{6}$/i.test(color)) {
            return interaction.reply({ content: "Please provide a valid hex code!", ephemeral: true })
        }

        const embedColor = parseInt(color.replace("#", "0x"));

        const embed = new EmbedBuilder()

            .setTitle(embedTitle)
            .setColor(embedColor)
            .setDescription(embedDescription)
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [embed] })
    }, 
};