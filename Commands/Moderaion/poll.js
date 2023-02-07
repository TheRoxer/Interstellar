const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { footer, botColor } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Creates a poll")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(options => options
            .setName("question")
            .setDescription("Question to ask")
            .setRequired(true)
        ),


    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const question = interaction.options.getString("question");

        const pollEmbed = new EmbedBuilder()

            .setTitle(`Server poll:`)
            .setColor(botColor)
            .addFields(
                { name: `Question:`, value: `${question}` },
                { name: `Yes's:`, value: `0`, inline: true },
                { name: `No's:`, value: `0`, inline: true }
            )
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();


        const replyObject = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
        const pollButtons = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setLabel("Yes")
                    .setCustomId(`Poll-Yes-${replyObject.id}`)
                    .setStyle(ButtonStyle.Success)
                    .setEmoji(`<a:yes:1002716841380171826>`),

                new ButtonBuilder()
                    .setLabel("No")
                    .setCustomId(`Poll-No-${replyObject.id}`)
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji(`<a:no:1002716843498274847>`)
            )
        interaction.editReply({ components: [pollButtons] });
    }, 
};