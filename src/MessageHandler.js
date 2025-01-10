const Config = require('./Config');

function MessageHandler(client) {
  client.on("messageCreate", handleMessage);

  let lastReplyTime = new Date(0);

  async function handleMessage(message) {

    if (Config.getChannels().indexOf(message.channelId) === -1) return;
    if (!await isNeedToReply(message)) return;
    lastReplyTime = new Date();

    //console.log('message.reply(getReplayMessage())');
    setTimeout(() => {
      message.reply(getReplayMessage());
    }, 3000 + (Math.random() * 5000))
  }

  this.getReplayMessage = getReplayMessage;

  function getReplayMessage() {
    let getWipe = (server) => Config.getWipes()[server].date.toLocaleDateString('ru-RU');
    let getRef = (server) => Config.getWipes()[server].ref;
    let getDays = (server) => Math.floor((new Date() - Config.getWipes()[server].date) / (24 * 60 * 60 * 1000));

    let dayLength = Math.max(['an', 'surv', 'ob'].map(getDays)).toString().length;

    return [
      '```txt',
      `Режим       Дата вайпа    Прошло дней`,
      `Анархия     ${getWipe('an')}    ${getDays('an').toString().padStart(dayLength)}`,
      `Выживание   ${getWipe('surv')}    ${getDays('surv').toString().padStart(dayLength)}`,
      `Один Блок   ${getWipe('ob')}    ${getDays('ob').toString().padStart(dayLength)}`,
      '```',
      `Источник: [анархия](${getRef('an')}), [выживание](${getRef('surv')}), [один блок](${getRef('ob')})`
    ].join('\n');
  }


  async function isNeedToReply(message) {

    let isReplyForMyMessage = await checkIsReplyForMyMessage(message);
    let isMention = message.content.indexOf(`<@${client.user.id}>`) !== -1;
    let isCooldown = new Date() - lastReplyTime < Config.cfg.reply_cooldown_ms;

    return (isReplyForMyMessage || isMention) && !isCooldown;

  }

  async function checkIsReplyForMyMessage(message) {
    if (message.type !== "REPLY") return false;

    let messageRef = await message.fetchReference();
    return messageRef?.author?.id === client.user.id;
  }
}

module.exports = MessageHandler;