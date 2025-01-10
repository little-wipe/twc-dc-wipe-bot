const {Client} = require('discord.js-selfbot-v13');
const client = new Client();

const Config = require('./Config');
const MessageHandler = require('./MessageHandler');
let messageHandler = new MessageHandler(client);

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});

if (process.argv.indexOf("--dump-msg") !== -1) {
  console.log(messageHandler.getReplayMessage())
} else {
  client.login(Config.getToken());
}


