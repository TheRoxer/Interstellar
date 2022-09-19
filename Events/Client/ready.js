const { loadCommands } = require("../../Handlers/commandHandler");
const { connect } = require("mongoose");
const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("Client is ready");

    connect(client.config.DatabaseURL, {}).then(() =>
      console.log(chalk.yellow(`✅ >> Successfully connected to Database.`))
    );

    loadCommands(client);
  },
};
