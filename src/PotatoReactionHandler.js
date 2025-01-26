const Config = require('./Config');

function PotatoReactionHandler(client) {
  client.on("messageCreate", handleMessage);

  async function handleMessage(message) {
    if (Config.getChannels().indexOf(message.channelId) === -1) return;
    if ((await getTeamList()).indexOf(message.author.id) === -1) return;

    setTimeout(() => {
      message.react(getReaction());
    }, 1000 + Math.random() * 10000);
  }

  async function getTeamList() {
    this._teamLastUpdated = this._teamLastUpdated || new Date(0);
    this._teamListCache = this._teamListCache || [];

    if (new Date() - this._teamLastUpdated < Config.cfg.potatoTeamUpdateCooldownMs)
      return this._teamListCache;
    this._teamLastUpdated = new Date();

    const channel = await client.channels.fetch(Config.cfg.potatoTeam.channel);
    const message = await channel.messages.fetch(Config.cfg.potatoTeam.message);

    this._teamListCache = message.content.match(/(<@\d+>)/gm).map(row => row.replace(/\D/gm, ''))

    this._teamListCache.push(...Config.cfg.potatoTeam.userIds);

    return this._teamListCache;
  }


  function getReaction() {

    //@formatter:off
    const list = [
      '🥔', '🥑', '🍆', '🥕',
      '🌽', '🌶️', '🫑', '🥒',
      '🥬', '🥦', '🧄', '🧅',
      '🍅', '🫘', '🌰', '🫚',
      '🫛', '🍄‍🟫',
    ];
    //@formatter:on

    if (Math.random() >= 0.5)
      return list[0]; // potato

    return list[Math.floor(Math.random() * list.length)]
  }

}


module.exports = PotatoReactionHandler;