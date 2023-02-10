const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { footer, botColor } = require("../../config.json");
const logSchema = require("../../schemas/logSchema.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user from the discord server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to be banned.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the ban.")
        ),

    async execute(interaction) {
        const { options } = interaction;
        const logData = await logSchema.findOne({ guildId: interaction.guild.id });
        const logChannel = logData.logsId;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided.";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on ${user.username} since they have a higher role.`)
            .setColor(botColor);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Moderation | Action: Ban" })
            .addFields(
                {
                    name: `Succesfully banned ` + "`" + `${user.tag}` + "`" + ` with reason: ` + "`" + `${reason}` + "`", 
                    value: `User id: __${user.id}__`, inline: true
                },
            )
            .setColor(botColor)
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() 
            })

            .setTimestamp();

        await interaction.reply({
            embeds: [embed] 
        });
        interaction.member.guild.channels.cache.get(logChannel).send({
            embeds: [embed],
        });
    }
}