const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { loadEvents } = require("./Handlers/eventHandler");
const Deezer = require("erela.js-deezer");
const Apple = require("erela.js-apple");
const { Manager } = require("erela.js");
const { LavasfyClient } = require("lavasfy");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
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

client.lavasfy = new LavasfyClient(
  {
    clientID: client.config.spotifyClientID,
    clientSecret: client.config.spotifySecret,
    filterAudioOnlyResult: true,
    autoResolve: true,
    useSpotifyMetadata: true,
    playlistPageLoadLimit: 1,
  },
  client.config.nodes
);

client.manager = new Manager({
  nodes: client.config.nodes,
  plugins: [new Apple(), new Deezer()],
  send: (id, payload) => {
    let guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
});
