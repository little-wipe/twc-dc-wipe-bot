const {Client} = require('discord.js-selfbot-v13');
const client = new Client();

const Config = require('./Config');

const modules = {};

const WipeInfoHandler = require('./WipeInfoHandler');
const PotatoReactionHandler = require('./PotatoReactionHandler');

if (Config.cfg.wipeInfoModule)
  modules.wipeInfoHandler = new WipeInfoHandler(client);

if (Config.cfg.potatoReactionModule)
  modules.potatoReactionHan = new PotatoReactionHandler(client);


client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});

if (process.argv.indexOf("--dump-msg") !== -1) {
  modules.wipeInfoHandler = new WipeInfoHandler(client);
  console.log(modules.wipeInfoHandler.getReplayMessage())
} else {
  client.login(Config.getToken());
}


