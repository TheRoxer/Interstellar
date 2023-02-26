const { Client, EmbedBuilder, ModalSubmitInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ms = require("ms");
const giveawaySchema = require("../../schemas/giveawaySchema");
const { endGiveaway } = require("../../Functions/giveawayFunctions");
const { botColor, footer } = require("../../config.json");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId !== "giveaway-options") return;

        const embed = new EmbedBuilder();

        const prize = interaction.fields.getTextInputValue("giveaway-prize").slice(0, 256);
        const winners = Math.round(parseFloat(interaction.fields.getTextInputValue("giveaway-winners")));
        const duration = ms(interaction.fields.getTextInputValue("giveaway-duration"));

        if (isNaN(winners) || !isFinite(winners) || winners < 1) {
            embed
                .setColor("Red")
                .setDescription("Please provide a valid winner count");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (duration === undefined) {
            embed
                .setColor("Red")
                .setDescription("Please provide a valid duration");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const formattedDuration = parseInt((Date.now() + duration) / 1000);

        const giveawayEmbed = new EmbedBuilder()
            // .setTitle(" <a:Giveaway:842138716030107672> Giveaway started! <a:Giveaway:842138716030107672>")
            .setTitle(prize)
            .setColor(botColor)
            // .setDescription(`**Hosted By**: ${interaction.member}\n**Entries**: ${entries}**Winners**: ${winners}\n**Ends In**: <t:${formattedDuration}:R> (<t:${formattedDuration}>)`)
            .addFields(
                { name: "Hosted By", value: interaction.user.tag, inline: true },
                { name: "Winners", value: String(winners), inline: true },
                { name: "Ends In", value: `<t:${formattedDuration}:R> (<t:${formattedDuration}>)` }
            )
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() 
            })
            .setTimestamp();

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("giveaway-join")
                .setEmoji("<a:Giveaway:842138716030107672>")
                .setStyle(ButtonStyle.Success)
                .setLabel("Join Here")
        );

        interaction.reply({ embeds: [giveawayEmbed], components: [button], fetchReply: true }).then(async (message) => {
            await giveawaySchema.create({
                GuildID: interaction.guild.id,
                ChannelID: interaction.channel.id,
                EndTime: formattedDuration,
                Ended: false,
                HostedBy: interaction.user.id,
                Prize: prize,
                Winners: winners,
                Paused: false,
                MessageID: message.id,
                Entered: []
            }).then((data) => {
                setTimeout(async () => {
                    if (!data.Ended) endGiveaway(message);
                }, duration);
            });
        });
    }
};