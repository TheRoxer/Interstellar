const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("Client is ready");

    client.manager.init(client.user.id);
    client.lavasfy.requestToken();

    loadCommands(client);
  },
};
