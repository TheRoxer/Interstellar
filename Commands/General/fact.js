const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
    botColor,
    footer,
} = require("../../config.json");

const fetch = require("node-fetch");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fact")
        .setDescription("Sends a random fact."),

    async execute(interaction) {
        await interaction.deferReply()
        fetch("https://useless-facts.sameerkumar.website/api")
            .then((res) => res.json())
            .then((body) => {
                async function send() {

                    const embed = new EmbedBuilder()

                        .setTitle(
                            `Its a completely useless fact!`
                        )
                        .setColor(botColor)
                        .setDescription(body.data)
                        .setTimestamp()
                        .setFooter({ 
                            text: footer.replace(`{user}`, interaction.user.tag), 
                            iconURL: interaction.user.displayAvatarURL() 
                        })

                    await wait(500);
                    await interaction.editReply({ embeds: [embed] });
                }
                send();
            });
    },
};
