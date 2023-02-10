const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const Transcript = require("discord-html-transcripts");
const { footer, botColor } = require("../../config.json");
const logSchema = require("../../schemas/logSchema.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears the chat")
        .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES)
        .setDMPermission(false)

        .addNumberOption(options => options
            .setName("amount")
            .setDescription("Amount of messages to delete")
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName("reason")
            .setDescription("Reason for clearing the chat")
            .setRequired(true)
        )
        .addUserOption(options => options
            .setName("target")
            .setDescription("User to clear messages from")
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
    */
    async execute(interaction) {

        const logData = await logSchema.findOne({ guildId: interaction.guild.id });
        const logChannel = logData.logsId;
        
        const amount = interaction.options.getNumber("amount");
        const reason = interaction.options.getString("reason");
        const target = interaction.options.getUser("target");

        const channelMessages = await interaction.channel.messages.fetch();

        const responseEmbed = new EmbedBuilder()
            .setColor(botColor)
            .setFooter({ text: footer.replace(`{user}`, interaction.user.tag), iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        
        const logEmbed = new EmbedBuilder() 
            .setAuthor({ name: "Moderation | Action: Clear" })
            .setDescription(`Succesfully cleared ${amount} messages.`)
            .addFields(
                { name: "Channel:", value: `${interaction.channel}`, inline: true },
                { name: "Reason", value: `${reason}`, inline: true },
                { name: "Target", value: `${target || "None"}`, inline: true }
            )

            .setColor(botColor)
            .setFooter({ text: footer.replace(`{user}`, interaction.user.tag), iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        
        if(target) {

            let i = 0;
            let messageToDelete = [];
            channelMessages.filter((message) => {
                if(message.author.id === target.id && i < amount) {
                    messageToDelete.push(message.id);
                    i++;
                }
            })

            const transcript = await Transcript.generateFromMessages(messageToDelete, interaction.channel);

            interaction.channel.bulkDelete(messageToDelete, true).then((messages) => {
                
                interaction.reply({ embeds: [responseEmbed.setDescription(`🧹 Cleared \`${messages.size}\` messages from ${target || "this channel"}`)]})
                interaction.member.guild.channels.cache.get(logChannel).send({
                    embeds: [logEmbed],
                    files: [transcript]
                });

            });

        } else {

            const transcript = await Transcript.createTranscript(interaction.channel, {limit: amount});

            interaction.channel.bulkDelete(amount, true).then((messages) => {
                
                interaction.reply({ embeds: [responseEmbed.setDescription(`🧹 Cleared \`${messages.size}\` messages from ${target || "this channel"}`)]})
                interaction.member.guild.channels.cache.get(logChannel).send({
                    embeds: [logEmbed],
                    files: [transcript]
                });

            });


        }

    }


}