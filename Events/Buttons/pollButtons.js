const { ButtonInteraction } = require("discord.js");
const votedMembers = new Set();

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction) {

        if(!interaction.isButton()) return;

        const splitArray = interaction.customId.split("-");
        if(splitArray[0] !== "Poll") return;

        if(votedMembers.has(`${interaction.user.id}-${interaction.message.id}`)) 
        return interaction.reply({content: "You have already voted!", ephemeral: true});

        votedMembers.add(`${interaction.user.id}-${interaction.message.id}`);

        const embed = interaction.message.embeds[0];
        if(!embed) return interaction.reply({content: "Unable to find the poll.", ephemeral: true});

        const yesField = embed.fields[1];
        const noField = embed.fields[2];

        switch(splitArray[1]) {
            case "Yes": {
                
                const newYesCount = parseInt(yesField.value) + 1;
                yesField.value = newYesCount;

                interaction.reply({content: "Your vote has been counted!", ephemeral: true});
                interaction.message.edit({embeds: [embed]});

            }
            break;
            case "No": {

                const newNoCount = parseInt(noField.value) + 1;
                noField.value = newNoCount;

                interaction.reply({content: "Your vote has been counted!", ephemeral: true});
                interaction.message.edit({embeds: [embed]});

            }
            break;

        }
    }
}

