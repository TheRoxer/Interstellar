const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { footer, botColor } = require("../../config.json");
const translate = require("google-translate-api-x");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translate provided text")
        .addStringOption((option) => {
            return option
                .setName("text")
                .setDescription("Text to translate")
                .setRequired(true)
        })
        .addStringOption((option) => {
            return option
                .setName("language")
                .setDescription("Language to translate to (en, fr, de, etc.)")
                .setRequired(true)
        }),

    async execute(interaction) {


        const text = interaction.options.getString("text");
        const language = interaction.options.getString("language");

        const translation = await translate(text, { 
            to: language, 
            autoCorrect: true 
        });

        const embed = new EmbedBuilder()

            .setTitle(`Translate`)
            .setColor(botColor)
            .addFields(
                {
                    name: "Text",
                    value: `╰ \`${text}\``
                },
                {
                    name: "Language",
                    value: `╰ \`${language}\``
                },
                {
                    name: `Translation to ${language}`,
                    value: `╰ \`${translation.text}\``
                }
            )
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }, 
};