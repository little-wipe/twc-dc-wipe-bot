const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './database.db',
  },
});

function Database() {

  initSchemas();


  this.getPotatoCount = async () => {
    let count = await knex("counters").where({name: "potato"}).select("count");

    return count?.[0]?.count || 0;
  }

  this.incrementPotato = async () => {
    let count = await this.getPotatoCount();

    await knex('counters').insert({
      name: "potato",
      count: count + 1
    }).onConflict("name").merge()
  }

  async function initSchemas() {
    if (!await knex.schema.hasTable('counters')) {
      await knex.schema.createTable('counters', (table) => {
        table.string('name').primary();
        table.integer('count')
      });
    }
  }
}

module.exports = new Database();