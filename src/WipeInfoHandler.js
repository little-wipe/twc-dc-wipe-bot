const Config = require('./Config');

function WipeInfoHandler(client) {
  client.on("messageCreate", handleMessage);

  let lastReplyTime = new Date(0);

  async function handleMessage(message) {

    if (Config.getChannels().indexOf(message.channelId) === -1) return;
    if (!await isNeedToReply(message)) return;

    if (!checkCooldown()) {
      message.channel.sendTyping();

      setTimeout(() => {
        getReplayMessage().then(msg => message.reply(msg));
      }, 3000 + (Math.random() * 5000));
    } else {
      // :stopwatch:
      message.react('⏱️')
    }

    lastReplyTime = new Date();
  }

  this.getReplayMessage = getReplayMessage;

  async function getReplayMessage() {
    const getWipe = (server) => Config.getWipes()[server].date.toLocaleDateString('ru-RU');
    const getRef = (server) => Config.getWipes()[server].ref;
    const getDays = (server) => Math.floor((new Date() - Config.getWipes()[server].date) / (24 * 60 * 60 * 1000));

    const dayLength = Math.max(['an', 'surv', 'ob'].map(getDays)).toString().length;
    const padNum = (num) => num.toString().padStart(dayLength);

    const colLength = [13, 14, 12];
    const padCol = (str, i) => str.toString().padEnd(colLength[i], ' ');

    //@formatter:off
    return [
      '```txt',
      ['Режим',      'Дата вайпа',           'Прошло дней'                   ].map(padCol).join(''),
      ['Анархия',    getWipe('an'),    padNum(getDays('an'))    ].map(padCol).join(''),
      ['Выживание',  getWipe('surv'),  padNum(getDays('surv'))  ].map(padCol).join(''),
      ['Один Блок',  getWipe('ob'),    padNum(getDays('ob'))    ].map(padCol).join(''),
      '```',
      [
        `-# Источник:`,
        `[анархия](${getRef('an')}),`,
        `[выживание](${getRef('surv')}),`,
        `[один блок](${getRef('ob')}),`,
        getPotatoReactionSourceLine(),
      ].join(' ')
    ].join('\n');
    //@formatter:on
  }

  function getPotatoReactionSourceLine() {
    const startMsg = "https://discord.com/channels/909558001239728168/909558001571102784/1333006503157698681";
    const endMsg = "https://discord.com/channels/909558001239728168/909558001571102784/1334864694833451048";
    return `[картофельный бунд](${startMsg})([победа](${endMsg}))`;
  }

  async function isNeedToReply(message) {
    // isMention
    return message.content.indexOf(`<@${client.user.id}>`) !== -1;
  }

  function checkCooldown() {
    return new Date() - lastReplyTime < Config.cfg.replyCooldownMs;
  }
}

module.exports = WipeInfoHandler;