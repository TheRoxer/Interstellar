const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { botColor, footer } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Get a meme!")
        .addStringOption(option =>
            option.setName("platform")
                .setDescription("Meme platform (optional)")
                .addChoices(
                    { name: "Reddit", value: "reddit" },
                    { name: "Giphy", value: "giphy" }
                )
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const platform = options.getString("platform");

        const embed = new EmbedBuilder();

        async function redditMeme() {
            await fetch('https://www.reddit.com/r/memes/random/.json').then(async res => {
                let meme = await res.json();

                let title = meme[0].data.children[0].data.title;
                let url = meme[0].data.children[0].data.url;
                let author = meme[0].data.children[0].data.author;

                const embed = new EmbedBuilder()
                    .setTitle(`${title}`)
                    .setImage(`${url}`)
                    .setColor(botColor)
                    .setFooter({ 
                        text: footer.replace(`{user}`, interaction.user.tag), 
                        iconURL: interaction.user.displayAvatarURL() })

                return interaction.reply({ embeds: [embed] });
            });
        }

        async function giphyMeme() {
            await fetch('https://api.giphy.com/v1/gifs/random?api_key=lYBciWOvaOhVPNzGy4J8mUXNpC53YNbz&tag=&rating=g').then(async res => {
                let meme = await res.json();

                let title = meme.data.title;
                let url = meme.data.images.original.url;
                let link = meme.data.url;

                const embed = new EmbedBuilder()
                    .setTitle(`${title}`)
                    .setImage(`${url}`)
                    .setURL(link)
                    .setColor(botColor)
                    .setFooter({ 
                        text: footer.replace(`{user}`, interaction.user.tag), 
                        iconURL: interaction.user.displayAvatarURL() })

                return interaction.reply({ embeds: [embed] });
            });
        }

        if (platform === "reddit") {
            redditMeme();
        }

        if (platform === "giphy") {
            giphyMeme();
        }

        if (!platform) {
            let memes = [giphyMeme, redditMeme];
            memes[Math.floor(Math.random() * memes.length)]();
        }

    }
}