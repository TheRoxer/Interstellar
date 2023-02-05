
    const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
    const { footer, botColor, clientID } = require("../../config.json");
    
    module.exports = {
        data: new SlashCommandBuilder()
            .setName("dm")
            .setDescription("Send a dm to provided user")
            .addUserOption((option) =>
                option
                    .setName("user")
                    .setDescription("The user to DM")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("message")
                    .setDescription("The message to DM")
                    .setRequired(true)
            ),
    
        execute(interaction) {

            const user = interaction.options.getMember("user")
            const message = interaction.options.getString("message")
            
            if (user.id === clientID) {
                return interaction.reply({ content: "You can't dm me!", ephemeral: true })
            }

            const messageEmbed = new EmbedBuilder()
    
                .setTitle(`From: ${interaction.guild.name}`)
                .setColor(botColor)
                .setDescription(`${message}`)
                .setFooter({ 
                    text: footer.replace(`{user}`, interaction.user.tag), 
                    iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            user.send(messageEmbed).catch(async (err) => {
                console.log(err)

                return await interaction.reply({ 
                    content: "Failed to send that message, try again later.", 
                    ephemeral: true 
                }).catch((err) => console.log(err))
            })

            const responseEmbed = new EmbedBuilder()
                .setTitle(`Sent to ${user.user.tag}`)
                .setColor(botColor)
                .addFields(
                    {
                        name: "__Message:__",
                        value: "```" + `${message}` + "```",
                    }

                )
                .setFooter({
                    text: footer.replace(`{user}`, interaction.user.tag),
                    iconURL: interaction.user.displayAvatarURL()
                })
                .setTimestamp();

            interaction.reply({ embeds: [responseEmbed], ephemeral: true })




    
    
        },
    };