module.exports = {

  // https://github.com/aiko-chan-ai/discord.js-selfbot-v13?tab=readme-ov-file#get-token-
  token: '',

  // https://discord.com/channels/909558001239728168/909558001571102784/1333006503157698681
  potatoReactionModule: false,
  potatoTeam: {
    channel: '1237694684743208961',
    message: '1237696421000515644',
    userIds: [],
  },
  potatoTeamUpdateCooldownMs: 10 * 60 * 1000,


  wipeInfoModule: true,
  replyCooldownMs: 60 * 1000,
  servers: {
    // Включаем это:
    // discord->settings->advanced->developer mode
    // После в контекстном меню будет пункт с копированием id канала


    // dev
    '1325632600890540095': {
      channels: [
        // main
        '1325632600890540098'
      ]
    },

    // another server
    // '00000000000000000': {
    //   channels: [
    //     // channel 1
    //     '11111111111111',
    //     // channel 2
    //     '22222222222222',
    //   ]
    // },
  },

  wipes: {
    an: {
      date: new Date('2024-09-27 22:17'),
      ref: 'https://discord.com/channels/909558001239728168/919126373027692544/1289304874709811271',
    },

    surv: {
      date: new Date('2024-06-11 21:54'),
      ref: 'https://discord.com/channels/909558001239728168/919126373027692544/1250161172053885022',
    },

    ob: {
      date: new Date('2024-04-20 23:03'),
      ref: 'https://discord.com/channels/909558001239728168/919126373027692544/1231334445739671675'
    },

    pot: {
      date: new Date('2025-01-26 12:31'),
      ref: 'https://discord.com/channels/909558001239728168/909558001571102784/1333006503157698681'
    }
  }
}
