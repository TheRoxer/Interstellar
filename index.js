const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { loadEvents } = require("./Handlers/eventHandler");
const chalk = require("chalk");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
  partials: [User, Message, GuildMember, ThreadMember],
});

require("dotenv").config();
const token = process.env.CLIENT_TOKEN;

client.events = new Collection();
client.commands = new Collection();
loadEvents(client);

process.on("unhandledRejection", (reason, p) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
      chalk.white("[ >>"),
      chalk.red.bold("AntiCrash"),
      chalk.white("<< ]"),
      chalk.gray(" : "),
      chalk.white.bold("Unhandled Rejection/Catch")
  );
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Uncaught Exception/Catch")
  );
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(err, origin);
});

client.login(token);
