const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandSubcommandBuilder } = require("discord.js");
const { Types } = require("mongoose");
const logSchema = require("../../schemas/logSchema.js");
const { botColor, footer } = require("../../config.json");  

module.exports = {

    data: new SlashCommandBuilder()
        .setName("log")
        .setDescription("Log options and setup")
        .addSubcommand((subcommand) =>
            subcommand
            .setName("setup")
            .setDescription("To use the log feature, select the log channel.")
            .addChannelOption((option) => {
                return option
                .setName("log-channel")
                .setDescription("channel to send the logs in")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            })
        )

        .addSubcommand((subcommand) =>
            subcommand.setName("delete").setDescription("Delete the log channel")
        ),
  
    /**
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {

        if(interaction.options.getSubcommand() === "setup") {

            

            const logChannel = interaction.options.getChannel("log-channel");

            const data = await logSchema.findOne({
                guildId: interaction.guild.id,
            });

            if (data) {

            const logChannelDb = await logSchema.findOne({ guildId: interaction.guild.id }).logsId;

            interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle("You have already setup the log system")
                    .addFields(
                        {
                            name: "<:channel:1072276171363991643> Channel",
                            value: `╰ <#${data.logsId}>`,
                            inline: true,
                        })


                    .setColor(botColor)
                    .setFooter({ 
                        text: footer.replace(`{user}`, interaction.user.tag), 
                        iconURL: interaction.user.displayAvatarURL() 
                    })
                    .setTimestamp()
                ]});
            return;
            }
    
            const newSchema = new logSchema({
                _id: Types.ObjectId(),
                logsId: logChannel.id,
                guildId: interaction.guild.id
            });
    
            newSchema.save().catch((err) => console.log(err));
    
            interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle("Log System Setup")
                    .setDescription("Successfully setup log system!")
                    .addFields(
                    {
                        name: "Log channel:",
                        value: `${logChannel}`,
                    })
                    .setColor(botColor)
                    .setFooter({ 
                        text: footer.replace(`{user}`, interaction.user.tag), 
                        iconURL: interaction.user.displayAvatarURL() 
                    })
                    .setTimestamp()
                ]
            })
            .catch(async (err) => {
                console.log(err);
                await interaction.reply({
                content: "An error has occurred...",
                });
            });

        } else if(interaction.options.getSubcommand() === "delete") {

            const data = await logSchema.findOne({
                guildId: interaction.guild.id,
            });
            
            if (!data) {
            interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle("You have not setup the log system")
                    .setDescription("To setup the log system, use `/log setup`")
                    .setColor(botColor)
                    .setFooter({ 
                        text: footer.replace(`{user}`, interaction.user.tag), 
                        iconURL: interaction.user.displayAvatarURL() 
                    })
                    .setTimestamp()
                ],
            });
            return;
            }
            
            await logSchema.findOneAndDelete({
                guildId: interaction.guild.id,
            }).catch((err) => console.log(err));
            
            interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle("Log System Deleted")
                    .setDescription("Successfully deleted the log system!")
                    .setColor(botColor)
                    .setFooter({ 
                        text: footer.replace(`{user}`, interaction.user.tag), 
                        iconURL: interaction.user.displayAvatarURL() 
                    })
                    .setTimestamp()
                ],
            });

        }
    }
  };


//   const data = await logSchema.findOne({
//     guildId: interaction.guild.id,
// });

// if (!data) {
// interaction.reply({
//     embeds: [
//     new EmbedBuilder()
//         .setTitle("You have not setup the log system")
//         .setDescription("To setup the log system, use `/log setup`"),
//     ],
//     ephemeral: true,
// });
// return;
// }

// await logSchema.findOneAndDelete({
//     guildId: interaction.guild.id,
// });

// interaction.reply({
//     embeds: [
//     new EmbedBuilder()
//         .setTitle("Log System Deleted")
//         .setDescription("Successfully deleted the log system!"),
//     ],
// });