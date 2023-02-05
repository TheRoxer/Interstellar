const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { botColor, footer, logChannel } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a user from the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to kick.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Kick reason.")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You cant kick ${user.username} becouse, he has a higher rank than you.`)
            .setColor(botColor)
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() 
            })
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Moderation | Action: Kick" })
            .addFields(
                {
                    name: `Succesfully kicked ` + "`" + `${user.tag}` + "`" + ` with reason: ` + "`" + `${reason}` + "`", 
                    value: `User id: __${user.id}__`, inline: true
                },
            )
            .setColor(botColor)
            .setFooter({ text: footer.replace(`{user}`, interaction.user.tag), iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
        interaction.member.guild.channels.cache.get(logChannel).send({
            embeds: [embed],
        });
    }
}