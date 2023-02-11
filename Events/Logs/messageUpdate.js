const { EmbedBuilder, Message } = require('discord.js');
const { botColor, footer } = require('../../config.json');
const logSchema = require('../../schemas/logSchema.js');


module.exports = {
    name: 'messageUpdate',
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    async execute(oldMessage, newMessage) {

        const logData = await logSchema.findOne({ guildId: newMessage.guild.id });
        const logChannel = logData.logsId;
    
        if (oldMessage.author.bot) return;
        if (oldMessage.content === newMessage.content) return;
        
        const Count = 1950;

        const OrginalMessage = oldMessage.content.slice(0, Count) + (oldMessage.content.length > Count ? '...' : '');
        const EditedMessage = newMessage.content.slice(0, Count) + (newMessage.content.length > Count ? '...' : '');



        const embed = new EmbedBuilder()
            .setAuthor({ name: "Logs | Action: Message Edit" })
            .setDescription(`📘 A [message](${newMessage.url}) was edited in ${newMessage.channel.mention} by ${newMessage.author}.`)
            .addFields(
                {
                    name: "**Before:**",
                    value: OrginalMessage,
                },
                { 
                    name: "**After:**",
                    value: EditedMessage,
                }
            )
            .setColor(botColor)
            .setFooter({ text: footer.replace(`{user}`, interaction.user.tag), iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
            
            interaction.member.guild.channels.cache.get(logChannel).send({
                embeds: [embed],
            });
        

    }
} 