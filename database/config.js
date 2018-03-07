const pgp = require('pg-promise')();

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'nest-egg'
};

const db = pgp(connection);

module.exports = { db };