

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { footer, botColor } = require("../../config.json");
const status = require('minecraft-server-util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("minecraft")
        .setDescription("Get information about a Minecraft java server")
        .addStringOption(option =>
            option
                .setName("ip")
                .setDescription("The IP of the server")
                .setRequired(true)
        ),

    async execute(interaction) {

        const ip = interaction.options.getString("ip");
        const options = {
            timeout: 1000 * 5, // timeout in milliseconds
            enableSRV: true // SRV record lookup
        };
        const icon = `https://api.mcstatus.io/v2/icon/${ip}`;


        const server = await status.status(
            ip, 
            25565, 
            options
        ).catch((err) => console.log(err));
        
        

        const embed = new EmbedBuilder()

            .setTitle(`Minecraft server status for ${ip}`)
            .setColor(botColor)
            .addFields(
                { name: "Version", value: server.version.name, inline: true },
                { name: "Online Players", value: String(server.players.online), inline: true },
                { name: "Max Players", value: String(server.players.max), inline: true },
            )

            .setFooter({ 
                text: footer.replace(`{user}`, interaction.user.tag), 
                iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()
            .setThumbnail(icon);
            
        interaction.reply({ embeds: [embed] });
    }, 
};