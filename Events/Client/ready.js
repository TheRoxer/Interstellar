const { loadCommands } = require("../../Handlers/commandHandler");
const { connect } = require("mongoose");
const chalk = require("chalk");
const { ActivityType } = require("discord.js");

require("dotenv").config();
const databaseURL = process.env.DATABASE_URL;

module.exports = {
  name: "ready", 
  once: true,
  execute(client) {
    console.log(chalk.blue("✅ >> Client is ready!"));

    connect(databaseURL, {}).then(() =>
      console.log(chalk.red(`✅ >> Successfully connected to Database.`))
    );

    client.user.setPresence({
      activities: [
          {
              name: `${client.guilds.cache.size} servers! | /help`,

              type: ActivityType.Playing,
          },
      ],
      status: "online",
  });
  

    loadCommands(client);
  },
};
