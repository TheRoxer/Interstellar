const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { footer, botColor } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user from the discord server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("Discord ID of the user you want to unban.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");
        const user = await interaction.client.users.fetch(userId);

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setAuthor({ name: "Moderation | Action: Ban" })
                .setDescription(`Succesfully unbanned __${user.tag}__ from the guild.`)
                .setColor(botColor)
                .setFooter({ 
                    text: footer.replace(`{user}`, interaction.user.tag), 
                    iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Please provide a valid member's ID.`)
                .setColor(botColor);

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}