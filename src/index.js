const {Client} = require('discord.js-selfbot-v13');
const client = new Client();

const Config = require('./Config');
const MessageHandler = require('./MessageHandler');

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  let messageHandler = new MessageHandler(client);
});

client.login(Config.getToken());


