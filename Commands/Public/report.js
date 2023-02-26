const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle  } = require("discord.js");
const { footer, botColor, } = require("../../config.json");
const logSchema = require("../../schemas/logSchema.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("Allows you to report a user to the server staff")
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("User to be reported`.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for the report")
                .setRequired(true)
        ),

    async execute(interaction) {

        const logData = await logSchema.findOne({ guildId: interaction.guild.id });
        const logChannel = logData.logsId;

        const target = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason")

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Moderation | Action: Report" })
            .setDescription(`Suceesfully reported \`${target.username}\``)
            .addFields(
                {
                    name: `Reason:`,
                    value: `\`${reason}\``
                },
            )
            .setColor(botColor)
            .setFooter({
                text: footer.replace(`{user}`, interaction.user.tag),
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp();

        interaction.reply({ embeds: [embed], ephemeral: true });
        
        embed.setColor('0xcca712')
        embed.setDescription(`\`${target.tag}\` has been reported by \`${interaction.user.tag}\``)  

        interaction.member.guild.channels.cache.get(logChannel).send({
            embeds: [embed],
        });


    }, 
};
