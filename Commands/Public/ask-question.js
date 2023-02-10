const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require("discord.js");
const { footer, botColor } = require("../../config.json");
const { askQuestion } = require("../../Functions/api-ask-question");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask the AI a question (response time depends on the complexity of the question)") 
        .addStringOption((option) =>
            option
                .setName("prompt")
                .setDescription("The prompt to ask the AI")
                .setRequired(true)
        ),

    async execute(interaction) {
        const prompt = interaction.options.getString("prompt");

        const embed = new EmbedBuilder()
            .setTitle("AI Response")
            .setColor(botColor)
            .setDescription("<a:loading:1070293739639144499> Thinking..")
            .setFooter({
                text: footer.replace(`{user}`, interaction.user.tag),
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

        const answer = await askQuestion(prompt); 
        while (answer == undefined) { return await new Promise ((resolve) => setTimeout(resolve, 500)); }

        embed.setDescription(answer);

        const button = new ButtonBuilder()
            .setCustomId('regenerate')
            .setLabel('Regenerate response (in dev)')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('🔁');
        
        const row = new ActionRowBuilder().addComponents( button );
        await interaction.editReply({ embeds: [embed], components: [row] });

        // TODO //
        interaction.client.on(Events.BUTTON_CLICK, async (buttonInteraction) => {
            if (buttonInteraction.customId === 'regenerate') {

                embed.setDescription("<a:loading:1070293739639144499> Thinking..");
                await interaction.editReply({ embeds: [embed] });

                const answer = await askQuestion(prompt); 
                while (answer == undefined) { return await new Promise ((resolve) => setTimeout(resolve, 500)); }
                embed.setDescription(answer);
            
                const row = new ActionRowBuilder().addComponents( button );
                await interaction.editReply({ embeds: [embed], components: [row] });

            }
        });
    }
};
