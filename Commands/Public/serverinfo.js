const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ChannelType,
    GuildVerificationLevel,
    GuildExplicitContentFilter,
    GuildNSFWLevel
} = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("serverinfo")
      .setDescription("Sends serverinfo embed"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
     async execute(interaction) {
        const { guild } = interaction;
        const {
            members,
            channels,
            emojis,
            stickers
        } = guild;
        
        const botCount     = members.cache.filter(member => member.user.bot).size;

        const splitPascal = (string, separator) => string.split(/(?=[A-Z])/).join(separator);
        const toPascalCase = (string, separator = false) => {
            const pascal = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
            return separator ? splitPascal(pascal, separator) : pascal;
        };

        const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;
        
        const totalChannels = getChannelTypeSize([
            ChannelType.GuildText,
            ChannelType.GuildNews,
            ChannelType.GuildVoice,
            ChannelType.GuildStageVoice,
            ChannelType.GuildForum,
            ChannelType.GuildPublicThread,
            ChannelType.GuildPrivateThread,
            ChannelType.GuildNewsThread,
            ChannelType.GuildCategory
        ]);

        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setColor(0x5112e4)
                .setTitle(`${guild.name}'s Information`)
                .setThumbnail(guild.iconURL({ size: 1024 }))
                .setImage(guild.bannerURL({ size: 1024 }))
                .addFields(
                    { name: "Description", value: `📝 ${guild.description || "None"}` },
                    {
                        name: "General",
                        value: [
                            `📜 **Created** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                            `💳 **ID** ${guild.id}`,
                            `👑 **Owner** <@${guild.ownerId}>`,
                            `🌍 **Language** ${new Intl.DisplayNames(["en"], { type: "language" }).of(guild.preferredLocale)}`,
                            `💻 **Vanity URL** ${guild.vanityURLCode || "None"}`,
                        ].join("\n")
                    },
                    { name: "Features", value: guild.features?.map(feature => `- ${toPascalCase(feature, " ")}`)?.join("\n") || "None", inline: true },
                    {
                        name: "Security",
                        value: [
                            `👀 **Explicit Filter** ${splitPascal(GuildExplicitContentFilter[guild.explicitContentFilter], " ")}`,
                            `🔞 **NSFW Level** ${splitPascal(GuildNSFWLevel[guild.nsfwLevel], " ")}`,
                            `🔒 **Verification Level** ${splitPascal(GuildVerificationLevel[guild.verificationLevel], " ")}`
                        ].join("\n"),
                        inline: true
                    },
                    {
                        name: `Users (${guild.memberCount})`,
                        value: [
                            `👨‍👩‍👧‍👦 **Members** ${guild.memberCount - botCount}`,
                            `🤖 **Bots** ${botCount}`
                        ].join("\n"),
                        inline: true
                    },
                    {
                        name: `Channels, Threads & Categories (${totalChannels})`,
                        value: [
                            `💬 **Text** ${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews])}`,
                            `🎙 **Voice** ${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}`,
                            `🧵 **Threads** ${getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])}`,
                            `📑 **Categories** ${getChannelTypeSize([ChannelType.GuildCategory])}`
                        ].join("\n"),
                        inline: true
                    },
                    {
                        name: `Emojis & Stickers (${emojis.cache.size + stickers.cache.size})`,
                        value: [
                            `📺 **Animated** ${emojis.cache.filter(emoji => emoji.animated).size}`,
                            `🗿 **Static** ${emojis.cache.filter(emoji => !emoji.animated).size}`,
                            `🏷 **Stickers** ${stickers.cache.size}`
                        ].join("\n"),
                        inline: true
                    },
                    { 
                        name: "Nitro",
                        value: [
                            `📈 **Tier** ${guild.premiumTier || "None"}`,
                            `💪🏻 **Boosts** ${guild.premiumSubscriptionCount}`,
                            `💎 **Boosters** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}`,
                            `🏋🏻‍♀️ **Total Boosters** ${guild.members.cache.filter(member => member.premiumSince).size}`
                        ].join("\n"),
                        inline: true
                    },
                    { name: "Banner", value: guild.bannerURL() ? "** **" : "None" }
                )
        ], });
    }
  };
  