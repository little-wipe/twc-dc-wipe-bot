const cfg = require('../config');


function Config() {
  this.cfg = cfg;

  /**
   * @returns {string}
   */
  this.getToken = () => cfg.token;

  /**
   * @returns {string[]}
   */
  this.getChannels = () => {
    let list = [];

    for (let id in cfg.servers) {
      list.push(...cfg.servers[id].channels)
    }

    return list;
  }

  this.getWipes = () => {
    return cfg.wipes;
  }
}

module.exports = new Config();