const { EmbedBuilder, Message, WebhookClient } = require('discord.js');
const { botColor, footer, logChannel } = require('../../config.json');

module.exports = {
    name: 'messageUpdate',
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
    
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
            
        new WebhookClient({ url: "https://discord.com/api/webhooks/1039579921250533416/GmeQT4fxbHvaC-kTsY_9El6htJBpSQCaIZDXwyCUzx0Z2OF49--vfHkFe0PvO2Yl97ws" }
        ).send({ embeds: [embed] }).catch((err) => console.log(err));
        

    }
} 