const Config = require('./Config');

function MessageHandler(client) {
  client.on("messageCreate", handleMessage);

  let lastReplyTime = new Date(0);

  async function handleMessage(message) {

    if (Config.getChannels().indexOf(message.channelId) === -1) return;
    if (!await isNeedToReply(message)) return;
    lastReplyTime = new Date();

    message.channel.sendTyping();

    setTimeout(() => {
      message.reply(getReplayMessage());
    }, 3000 + (Math.random() * 5000))
  }

  this.getReplayMessage = getReplayMessage;

  function getReplayMessage() {
    const getWipe = (server) => Config.getWipes()[server].date.toLocaleDateString('ru-RU');
    const getRef = (server) => Config.getWipes()[server].ref;
    const getDays = (server) => Math.floor((new Date() - Config.getWipes()[server].date) / (24 * 60 * 60 * 1000));

    const dayLength = Math.max(['an', 'surv', 'ob'].map(getDays)).toString().length;
    const padNum = (num) => num.toString().padStart(dayLength);

    const colLength = [12, 14, 11];
    const padCol = (str, i) => str.padEnd(colLength[i], ' ');

    //@formatter:off
    return [
      '```txt',
      ['Режим',      'Дата вайпа',           'Прошло дней'                   ].map(padCol).join(''),
      ['Анархия',    getWipe('an'),    padNum(getDays('an'))    ].map(padCol).join(''),
      ['Выживание',  getWipe('surv'),  padNum(getDays('surv'))  ].map(padCol).join(''),
      ['Один Блок',  getWipe('ob'),    padNum(getDays('ob'))    ].map(padCol).join(''),
      '```',
      `-# Источник: [анархия](${getRef('an')}), [выживание](${getRef('surv')}), [один блок](${getRef('ob')})`
    ].join('\n');
    //@formatter:on
  }


  async function isNeedToReply(message) {

    let isMention = message.content.indexOf(`<@${client.user.id}>`) !== -1;
    let isCooldown = new Date() - lastReplyTime < Config.cfg.reply_cooldown_ms;

    return isMention && !isCooldown;

  }
}

module.exports = MessageHandler;