const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
} = require("discord.js");
const {
    TwoZeroFourEight,
    FastType,
    FindEmoji,
    Flood,
    GuessThePokemon,
    MatchPairs,
    Minesweeper,
    Slots,
    Snake,
    Trivia,
    Wordle,
    WouldYouRather,
    Connect4,
    RockPaperScissors,
    TicTacToe
} = require('discord-gamecord');
const ms = require("ms");
const { footer, botColor } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("game")
        .setDescription("Play a few minigames within Discord.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("singleplayer")
                .setDescription("Play a single-player minigame within Discord.")
                .addStringOption(option =>
                    option.setName("game")
                        .setDescription("*Choose a game to play.")
                        .setRequired(true)
                        .addChoices(
                            { name: "2048", value: "2048" },
                            { name: "Fast-Type", value: "fasttype" },
                            { name: "Find-Emoji", value: "findemoji" },
                            { name: "Flood", value: "flood" },
                            { name: "Guess-The-Pokemon", value: "guessthepokemon" },
                            { name: "Match-Pairs", value: "matchpairs" },
                            { name: "Minesweeper", value: "minesweeper" },
                            { name: "Rock-Paper-Scissors", value: "rps" },
                            { name: "Slots", value: "slots" },
                            { name: "Snake", value: "snake" },
                            { name: "Trivia", value: "trivia" },
                            { name: "Wordle", value: "wordle" },
                            { name: "Would-You-Rather", value: "wouldyourather" },
                        )
                )

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("multiplayer")
                .setDescription("Play a multi-player minigame within Discord.")
                .addStringOption(option =>
                    option.setName("game")
                        .setDescription("*Choose a game to play.")
                        .setRequired(true)
                        .addChoices(
                            { name: "Connect-4", value: "connect4" },
                            { name: "Rock-Paper-Scissors", value: "rps" },
                            { name: "Tic-Tac-Toe", value: "tictactoe" },
                        )
                )
                .addUserOption(option =>
                    option.setName("user")
                        .setDescription('*Choose your opponent for the game.')
                        .setRequired(true)
                )
        )

        .setDMPermission(false),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const game = interaction.options.getString("game");

        switch (interaction.options.getSubcommand()) {

            case "singleplayer": {

                switch (game) {
                    case "2048": {
                        const Game = new TwoZeroFourEight({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: 2048',
                                color: botColor
                            },
                            emojis: {
                                up: '⬆️',
                                down: '⬇️',
                                left: '⬅️',
                                right: '➡️',
                            },
                            timeoutTime: 60000,
                            buttonStyle: 'PRIMARY',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "fasttype": {
                        const Game = new FastType({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Fast Type',
                                color: botColor,
                                description: 'You have {time} seconds to type the sentence below.'
                            },
                            timeoutTime: 60000,
                            sentence: 'Some really cool sentence to fast type.',
                            winMessage: 'You won! You finished the type race in {time} seconds with wpm of {wpm}.',
                            loseMessage: 'You lost! You didn\'t type the correct sentence in time.',
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "findemoji": {
                        const Game = new FindEmoji({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Find Emoji',
                                color: botColor,
                                description: 'Remember the emojis from the board below.',
                                findDescription: 'Find the {emoji} emoji before the time runs out.'
                            },
                            timeoutTime: 60000,
                            hideEmojiTime: 5000,
                            buttonStyle: 'PRIMARY',
                            emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
                            winMessage: 'You won! You selected the correct emoji. {emoji}',
                            loseMessage: 'You lost! You selected the wrong emoji. {emoji}',
                            timeoutMessage: 'You lost! You ran out of time. The emoji is {emoji}',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "flood": {
                        const Game = new Flood({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Flood',
                                color: botColor,
                            },
                            difficulty: 13,
                            timeoutTime: 60000,
                            buttonStyle: 'PRIMARY',
                            emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
                            winMessage: 'You won! You took **{turns}** turns.',
                            loseMessage: 'You lost! You took **{turns}** turns.',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "guessthepokemon": {
                        const Game = new GuessThePokemon({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Who\'s The Pokemon',
                                color: botColor
                            },
                            timeoutTime: 60000,
                            winMessage: 'You guessed it right! It was a {pokemon}.',
                            loseMessage: 'Better luck next time! It was a {pokemon}.',
                            errMessage: 'Unable to fetch pokemon data! Please try again.',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "matchpairs": {
                        const Game = new MatchPairs({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Match Pairs',
                                color: botColor,
                                description: '**Click on the buttons to match emojis with their pairs.**'
                            },
                            timeoutTime: 60000,
                            emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
                            winMessage: '**You won the Game! You turned a total of `{tilesTurned}` tiles.**',
                            loseMessage: '**You lost the Game! You turned a total of `{tilesTurned}` tiles.**',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "minesweeper": {
                        const Game = new Minesweeper({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Minesweeper',
                                color: botColor,
                                description: 'Click on the buttons to reveal the blocks except mines.'
                            },
                            emojis: { flag: '🚩', mine: '💣' },
                            mines: 5,
                            timeoutTime: 60000,
                            winMessage: 'You won the Game! You successfully avoided all the mines.',
                            loseMessage: 'You lost the Game! Beaware of the mines next time.',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "rps": {
                        let choices = ["rock", "paper", "scissor"]
                        const botchoice = `${choices[(Math.floor(Math.random() * choices.length))]}`
        
                        const Embed = new EmbedBuilder()
                            .setColor(botColor)
                            .setAuthor({ name: "Game: Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                            .setDescription(`<@${interaction.member.id}> choose your move.`)
                            .setFooter({ 
                                text: footer.replace(`{user}`, interaction.user.tag), 
                                iconURL: interaction.user.displayAvatarURL() 
                            })
        
                        const row = new ActionRowBuilder().addComponents(
        
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Primary)
                                .setCustomId("rock")
                                .setLabel("Rock")
                                .setEmoji(`✊`),
        
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Primary)
                                .setCustomId("paper")
                                .setLabel("Paper")
                                .setEmoji(`✋`),
        
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Primary)
                                .setCustomId("scissor")
                                .setLabel("Scissors")
                                .setEmoji(`✌`),
        
                        )
        
                        const Page = await interaction.reply({
        
                            embeds: [Embed],
                            components: [row]
                        })
                        const col = Page.createMessageComponentCollector({
                            componentType: ComponentType.Button,
                            time: ms("10s")
                        })
                        col.on("collect", i => {
        
                            switch (i.customId) {
        
                                case "rock": {
        
                                    if (botchoice == "rock") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(botColor)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`Game tied\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Rock", inline: true },
                                                        { name: "My choice", value: "Rock", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
        
                                    if (botchoice == "paper") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(botColor)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`You lost the game\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Rock", inline: true },
                                                        { name: "My choice", value: "Paper", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
                                    if (botchoice == "scissor") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(botColor)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`You won the game\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Rock", inline: true },
                                                        { name: "My choice", value: "Scissors", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
                                }
                                    break;
                                case "paper": {
                                    if (botchoice == "rock") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(botColor)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`You won the game\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Paper", inline: true },
                                                        { name: "My choice", value: "Rock", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
        
                                    if (botchoice == "paper") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(botColor)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`Game tied\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Paper", inline: true },
                                                        { name: "My choice", value: "Paper", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
                                    if (botchoice == "scissor") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(botColor)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`You lost the game\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Paper", inline: true },
                                                        { name: "My choice", value: "Scissors", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
                                }
                                    break;
        
                                case "scissor": {
        
                                    if (botchoice == "rock") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(`0x2f3136`)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`You lost the game\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Scissors", inline: true },
                                                        { name: "My choice", value: "Rock", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
        
                                    if (botchoice == "paper") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(botColor)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`You won the game\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Scissors", inline: true },
                                                        { name: "My choice", value: "Paper", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
                                    if (botchoice == "scissor") {
        
                                        return interaction.editReply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setColor(botColor)
                                                    .setAuthor({ name: "Rock Paper Scissors", iconURL: interaction.member.displayAvatarURL() })
                                                    .setDescription(`\`\`\`Game tied\`\`\``)
                                                    .addFields(
                                                        { name: "Your choice", value: "Scissors", inline: true },
                                                        { name: "My choice", value: "Scissors", inline: true }
                                                    )
                                            ],
                                            components: []
                                        })
                                    }
                                }
                                    break;
                            }
                        })
                        col.on("end", (collected) => {
        
                            if (collected.size > 0) return
        
                            interaction.editReply({
                                embeds: [
                                    Embed.
                                        setDescription(`:warning: | You did not choose your move.`)
                                        .setColor(botColor)
                                ],
                                components: []
                            })
                        })
                    }
                        break;
                    case "slots": {
                        const Game = new Slots({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Slot Machine',
                                color: botColor
                            },
                            slots: ['🍇', '🍊', '🍋', '🍌']
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "snake": {
                        const Game = new Snake({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Snake Game',
                                overTitle: 'Game Over',
                                color: botColor
                            },
                            emojis: {
                                board: '⬛',
                                food: '🍎',
                                up: '⬆️',
                                down: '⬇️',
                                left: '⬅️',
                                right: '➡️',
                            },
                            stopButton: 'Stop',
                            timeoutTime: 60000,
                            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
                            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();

                    }
                        break;
                    case "trivia": {
                        const Game = new Trivia({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Trivia',
                                color: botColor,
                                description: 'You have 60 seconds to guess the answer.'
                            },
                            timeoutTime: 60000,
                            buttonStyle: 'PRIMARY',
                            trueButtonStyle: 'SUCCESS',
                            falseButtonStyle: 'DANGER',
                            mode: 'multiple',  // multiple || single
                            difficulty: 'medium',  // easy || medium || hard
                            winMessage: 'You won! The correct answer is {answer}.',
                            loseMessage: 'You lost! The correct answer is {answer}.',
                            errMessage: 'Unable to fetch question data! Please try again.',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();

                    }
                        break;
                    case "wordle": {
                        const Game = new Wordle({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Wordle',
                                color: botColor,
                            },
                            customWord: null,
                            timeoutTime: 60000,
                            winMessage: 'You won! The word was **{word}**.',
                            loseMessage: 'You lost! The word was **{word}**.',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "wouldyourather": {
                        const Game = new WouldYouRather({
                            message: interaction,
                            slash_command: true,
                            embed: {
                                title: 'Game: Would You Rather',
                                color: botColor,
                            },
                            buttons: {
                                option1: 'Option 1',
                                option2: 'Option 2',
                            },
                            timeoutTime: 60000,
                            errMessage: 'Unable to fetch question data! Please try again.',
                            playerOnlyMessage: 'Only {player} can use these buttons.'
                        });
        
                        Game.startGame();
                    }
                        break;
                }

            }
            break;

            case "multiplayer": {

                const user = interaction.options.getUser("user");

                if (!user) {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(botColor)
                                .setDescription(":warning: | The target specified has most likely left the server.")
                        ],
                        ephemeral: true
                    })
                }
        
                if (user.bot) {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(botColor)
                                .setDescription(":warning: | You are not allowed to play with or against a bot.")
                        ],
                        ephemeral: true
                    })
                }
        
                if (user.id === interaction.user.id) {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(botColor)
                                .setDescription(":warning: | You cannot play a multi-player game with yourself.")
                        ],
                        ephemeral: true
                    })
                }
        
                switch (game) {
                    case "connect4": {
                        const Game = new Connect4({
                            message: interaction,
                            slash_command: true,
                            opponent: interaction.options.getUser('user'),
                            embed: {
                                title: 'Game: Connect4 Game',
                                statusTitle: 'Status',
                                color: botColor
                            },
                            emojis: {
                                board: '⚪',
                                player1: '🔴',
                                player2: '🟡'
                            },
                            mentionUser: true,
                            timeoutTime: 60000,
                            buttonStyle: 'PRIMARY',
                            turnMessage: '{emoji} | Its turn of player **{player}**.',
                            winMessage: '{emoji} | **{player}** won the Connect4 Game.',
                            tieMessage: 'The Game tied! No one won the Game!',
                            timeoutMessage: 'The Game went unfinished! No one won the Game!',
                            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "rps": {
                        const Game = new RockPaperScissors({
                            message: interaction,
                            slash_command: true,
                            opponent: interaction.options.getUser('user'),
                            embed: {
                                title: 'Game: Rock Paper Scissors',
                                color: botColor,
                                description: 'Press a button below to make a choice.'
                            },
                            buttons: {
                                rock: 'Rock',
                                paper: 'Paper',
                                scissors: 'Scissors'
                            },
                            emojis: {
                                rock: '🌑',
                                paper: '📰',
                                scissors: '✂️'
                            },
                            mentionUser: true,
                            timeoutTime: 60000,
                            buttonStyle: 'PRIMARY',
                            pickMessage: 'You choose {emoji}.',
                            winMessage: '**{player}** won the Game! Congratulations!',
                            tieMessage: 'The Game tied! No one won the Game!',
                            timeoutMessage: 'The Game went unfinished! No one won the Game!',
                            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
                        });
        
                        Game.startGame();
                        
                    }
                        break;
                    case "tictactoe": {
                        const Game = new TicTacToe({
                            message: interaction,
                            slash_command: true,
                            opponent: interaction.options.getUser('user'),
                            embed: {
                                title: 'Game: Tic Tac Toe',
                                color: botColor,
                                statusTitle: 'Status',
                                overTitle: 'Game Over'
                            },
                            emojis: {
                                xButton: '❌',
                                oButton: '🔵',
                                blankButton: '➖'
                            },
                            mentionUser: true,
                            timeoutTime: 60000,
                            xButtonStyle: 'DANGER',
                            oButtonStyle: 'PRIMARY',
                            turnMessage: '{emoji} | Its turn of player **{player}**.',
                            winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
                            tieMessage: 'The Game tied! No one won the Game!',
                            timeoutMessage: 'The Game went unfinished! No one won the Game!',
                            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
                        });
        
                        Game.startGame();

                    }
                        break;
                }

            }
            break;
        }
    }
}