const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { footer, botColor, logChannel } = require("../../config.json");
const Transcript = require("discord-html-transcripts");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("transcript")
        .setDescription("Creates a transcript of the chat")
        .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES)
        .setDMPermission(false)

        .addNumberOption(options => options
            .setName("amount")
            .setDescription("Amount of messages to include in the transcript (enter 0 for all messages))")
            .setRequired(true)
        )
        .addChannelOption(options => options
            .setName("channel")
            .setDescription("Channel to create a transcript of")
            .setRequired(false)
        ),

    async execute(interaction) {

        const amount = interaction.options.getNumber("amount");
        const channel = interaction.options.getChannel("channel");

        const responseEmbed = new EmbedBuilder()

            .setTitle(`Moderation | Action: Transcript`)
            .setColor(botColor) 
            
            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        if (amount == 0) {

            const transcript = await Transcript.createTranscript(channel || interaction.channel);

            interaction.reply({ embeds: [
                responseEmbed.setDescription(
                    `Created a transcript of all the messages in ${interaction.channel} channel. \n Go to ${interaction.member.guild.channels.cache.get(logChannel)} to see the transcript.`
                )
            ]});

            interaction.member.guild.channels.cache.get(logChannel).send({
                embeds: [responseEmbed.setDescription(
                    `Created a transcript of all the messages in ${interaction.channel} channel.`
                )],
                files: [transcript]
            });

        } else {

            const transcript = await Transcript.createTranscript(channel || interaction.channel, {limit: amount});

            interaction.reply({ embeds: [
                responseEmbed.setDescription(
                    `Created a transcript of the \`${amount}\` messages in ${interaction.channel} channel. \n Go to ${interaction.member.guild.channels.cache.get(logChannel)} to see the transcript.`
                )
            ]});
            
            interaction.member.guild.channels.cache.get(logChannel).send({
                embeds: [responseEmbed.setDescription(
                    `Created a transcript of the \`${amount}\` messages in ${interaction.channel} channel.`
                )],
                files: [transcript]
            });
        }

        


    }, 
};