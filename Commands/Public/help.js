const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
    botColor,
    footer,
} = require("../../config.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows all commands")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("Provide a command name")
                .setAutocomplete(true)
        ),
    async autocomplete(interaction) {
        const data = Array.from(interaction.client.commands.values());
        const focusedValue = interaction.options.getFocused();
        let choices = data.map((value) => value.data.name);
        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },
    
    async execute(interaction) {
        const providedCommand = interaction.options.getString("name");
        const commandList = Array.from(interaction.client.commands.values());
        const commandMap = commandList.map((value) => value.data.name);
        if (providedCommand == null) {
            const embed = new EmbedBuilder()

                .setAuthor({
                    name: interaction.guild.name,
                    iconURL: interaction.guild.iconURL(),
                })
                .setColor(botColor)

                .addFields(
                    commandList.map((value) => {
                        return {
                            name: `/` + value.data.name,
                            value: value.data.description,
                        };
                    })
                )  

                .setTimestamp()
                .setFooter({ 
                    text: footer.replace(`{user}`, interaction.user.tag), 
                    iconURL: interaction.user.displayAvatarURL() 
                })
            await interaction.reply({ embeds: [embed] });
        }

        for (let i = 0; i < commandMap.length; i++) {
            if (!commandMap.includes(providedCommand)) { 
                await interaction.reply({
                    content: "Command not found",
                    ephemeral: true,
                }).catch((error) => {
                })
            }
        }

        async function help(number) {
            if (providedCommand == commandMap[number]) {
                const name = commandList.map((value) => value.data.name);
                const desc = commandList.map((value) => value.data.description);

                const embed = new EmbedBuilder()

                    .setAuthor({
                        name: interaction.guild.name,
                        iconURL: interaction.guild.iconURL(),
                    })
                    .setColor(botColor)

                    .addFields({
                        name: `/` + name[number],
                        value: desc[number],
                    })
                    .setTimestamp()
                    .setFooter({ 
                        text: footer.replace(`{user}`, interaction.user.tag), 
                        iconURL: interaction.user.displayAvatarURL() 
                    })
                await interaction.reply({ embeds: [embed] });
            }
        }
        for (let i = 0; i < commandMap.length; i++) {
            help(i);
        }
    },
};
