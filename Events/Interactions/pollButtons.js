const { ButtonInteraction } = require("discord.js");
const { Types } = require("mongoose");
const pollSchema = require("../../schemas/pollSchema");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction) {

        if(!interaction.isButton()) return;

        const splitArray = interaction.customId.split("-");
        if(splitArray[0] !== "Poll") return;

        const data = await pollSchema.findOne({
            userId: interaction.user.id,
            messageId: interaction.message.id
        });

        if(data) 
        return interaction.reply({content: "You have already voted!", ephemeral: true});

        const newSchema = new pollSchema({
            _id: Types.ObjectId(),
            userId: interaction.user.id,
            messageId: interaction.message.id
        });

        newSchema.save().catch((err) => console.log(err));

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

