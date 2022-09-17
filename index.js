const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { loadEvents } = require("./Handlers/eventHandler");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
loadEvents(client);

const { connect } = require("mongoose");
connect(client.config.DatabaseURL, {}).then(() =>
  console.log("Sucessfully conected to the database.")
);

client.login(client.config.token);
