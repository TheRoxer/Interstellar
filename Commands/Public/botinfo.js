const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ChannelType,
    UserFlags,
    version
} = require("discord.js");

  const { connection } = require("mongoose");
  const os             = require("os");

  const status = [
    "Disconnected",
    "Connected",
    "Connecting",
    "Disconnecting"
];
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("botinfo")
      .setDescription("Sends botinfo embed"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
     async execute(interaction) {

        const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;
        const client = interaction.client;

        const embed = new EmbedBuilder()

            .setColor(0x5112e4)
            .setTitle(`🤖 ${client.user.username} Status`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(client.application.description || null)
            .addFields(
                { name: "👩🏻‍🔧 Client", value: client.user.tag, inline: true },
                { name: "📆 Created", value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "☑ Verified", value: client.user.flags & UserFlags.VerifiedBot ? "Yes" : "Not yet!", inline: true },
                { name: "📚 Database", value: status[connection.readyState], inline: true },
                { name: "👩🏻‍💻 Owner", value: `ItzRoxer#9464`, inline: true },
                { name: "🖥 System", value: os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS"), inline: true },
                { name: "🧠 CPU Model", value: `${os.cpus()[0].model}`, inline: true },
                { name: "💾 CPU Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },
                { name: "⏰ Up Since", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
                { name: "👩🏻‍🔧 Node.js", value: process.version, inline: true },
                { name: "🛠 Discord.js", value: version, inline: true },
                { name: "🏓 Ping", value: `${client.ws.ping}ms`, inline: true },
                { name: "🤹🏻‍♀️ Commands", value: `${client.commands.size}`, inline: true },
                { name: "🌍 Servers", value: `${client.guilds.cache.size}`, inline: true },
                { name: "👨‍👩‍👧‍👦 Users", value: `${client.users.cache.size}`, inline: true },
                { name: "💬 Text Channels", value: `${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildNews])}`, inline: true },
                { name: "🎤 Voice Channels", value: `${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}`, inline: true },
                { name: "🧵 Threads", value: `${getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])}`, inline: true }
            )
            .setFooter({ text: "Interstellar" });
            
        interaction.reply({ embeds: [embed] });
    },
  };
  