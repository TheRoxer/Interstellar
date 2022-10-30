const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { footer, botColor } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a member from the guild.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("Select the user you wish to mute.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("time")
                .setDescription("How long should the mute last? (in minutes)")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("What is the reason of the mute?")
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("target");
        const member = guild.members.cache.get(user.id);
        const time = options.getString("time");
        const reason = options.getString("reason") || "No reason provided.";

        const errEmbed = new EmbedBuilder()
            .setDescription("Something went wrong. Please try again later.")
            .setColor(botColor);

        const succesEmbed = new EmbedBuilder()
            .setAuthor({ name: "Moderation | Action: Mute" })
            .setDescription(`Succesfully muted ` + "`" + `${user.tag}.` + "`")
            .addFields(
                { name: "Reason", value: `${reason}`, inline: true },
                { name: "Duration", value: `${time}min`, inline: true }
            )
            .setColor(botColor)
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        if (
            member.roles.highest.position >=
            interaction.member.roles.highest.position
        )
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        if (
            !interaction.guild.members.me.permissions.has(
                PermissionFlagsBits.ModerateMembers
            )
        )
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        if (!time * 60 * 1000 )
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try { 
            await member.timeout(time * 60 * 1000, reason);

            interaction.reply({ embeds: [succesEmbed] });
        } catch (err) {
            console.log(err);
        }
    },
};
 