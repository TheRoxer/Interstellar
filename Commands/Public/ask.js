const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events } = require("discord.js");
const { footer, botColor } = require("../../config.json");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const apiKey = process.env.OPENAI_KEY;
const configuration = new Configuration({
    apiKey: apiKey
}); 
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask Chat-GPT to generate an anwser, code or image!")
        .addSubcommand(subcommand => subcommand.setName("question")
            .setDescription("Ask Chat-GPT a question!")
            .addStringOption(option => option.setName("prompt")
                .setDescription("What do you want to ask?")
                .setRequired(true)),
        )
        .addSubcommand(subcommand => subcommand.setName("code")
            .setDescription("Ask Chat-GPT to generate code!")
            .addStringOption(option => option.setName("prompt")
                .setDescription("What do you want to generate?")
                .setRequired(true)),
        )
        .addSubcommand(subcommand => subcommand.setName("image")
            .setDescription("Ask Chat-GPT to generate an image!")
            .addStringOption(option => option.setName("prompt")
                .setDescription("What do you want to generate?")
                .setRequired(true)),
        ),

    async execute(interaction) {

        subcommand = interaction.options.getSubcommand();
        const prompt = interaction.options.getString("prompt");

        switch (subcommand) {

            case "question": {

                const embed = new EmbedBuilder()
                    .setTitle("AI Response")
                    .setColor(botColor)
                    .setDescription("<a:loading:1070293739639144499> Thinking..")
                    .setFooter({
                        text: footer.replace(`{user}`, interaction.user.tag),
                        iconURL: interaction.user.displayAvatarURL(),
                    })
                    .setTimestamp();
    
                const replyObject = await interaction.reply({ embeds: [embed], fetchReply: true });
                
                try {

                    const response = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: prompt,
                        temperature: 0.7,
                        max_tokens: 256,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                    });
                    const answer = response.data.choices[0].text;

                    embed.setDescription(answer);

                    // const button = new ButtonBuilder()
                    //     .setCustomId(`regenerate-question-${prompt}-${replyObject.id}`)
                    //     .setLabel('Regenerate response (in dev)')
                    //     .setStyle(ButtonStyle.Primary)
                    //     .setEmoji('🔁');
                
                    // const row = new ActionRowBuilder().addComponents( button );
                    await interaction.editReply({ embeds: [embed], /**components: [row]*/ });

                } catch (error) {

                    console.log(error);
                    embed.setDescription("<a:no:1002716843498274847> Request failed! Please try again later!");
                    interaction.editReply({ embeds: [embed] });

                }

            } break;

            case "code": {

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
                
                try {

                    const response = await openai.createCompletion({
                        model: "code-davinci-002",
                        prompt: prompt,
                        temperature: 0.7,
                        max_tokens: 256,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                    });
                    const answer = response.data.choices[0].text;

                    embed.setDescription(answer);
                    interaction.editReply({ embeds: [embed] });

                } catch (error) {

                    console.log(error);
                    embed.setDescription("<a:no:1002716843498274847> Request failed! Please try again later!");
                    interaction.editReply({ embeds: [embed] });

                }

            } break;

            case "image": {

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

                try {

                    const response = await openai.createImage({
                        prompt: prompt,
                        n: 1, 
                        size: '1024x1024',
                    });
                    image = response.data.data[0].url;

                    embed.setDescription(`Image with prompt: \`${prompt}\``);
                    embed.setImage(image);

                    interaction.editReply({ embeds: [embed] });

                } catch (error) {

                    console.log(error);
                    embed.setDescription("<a:no:1002716843498274847> Request failed! Please try again later!");
                    interaction.editReply({ embeds: [embed] });

                }

            } break;
        }
    }, 
};

