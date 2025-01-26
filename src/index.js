const {Client} = require('discord.js-selfbot-v13');
const client = new Client();

const Config = require('./Config');
const WipeInfoHandler = require('./WipeInfoHandler');
let wipeInfoHandler = new WipeInfoHandler(client);

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});

if (process.argv.indexOf("--dump-msg") !== -1) {
  console.log(wipeInfoHandler.getReplayMessage())
} else {
  client.login(Config.getToken());
}


