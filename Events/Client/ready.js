const { loadCommands } = require("../../Handlers/commandHandler");
const { connect } = require("mongoose");
const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(chalk.blue("✅ >> Client is ready!"));

    connect(client.config.databaseURL, {}).then(() =>
      console.log(chalk.red(`✅ >> Successfully connected to Database.`))
    );

    loadCommands(client);
  },
};
