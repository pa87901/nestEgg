const pgp = require('pg-promise')();
const schema = require('./schema');

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'nestegg'
};

const url = process.env.DATABASE_URL || connection;

const db = pgp(url);

const loadDb = database => schema(database);
const resetDb = () => db.none('TRUNCATE holdings RESTART IDENTITY CASCADE');

loadDb(db)
  .then(() => {
    console.log('Successfully connected to database!'); // eslint-disable-line no-console
  })
  .catch(err => {
    console.error('Error connecting to database:', err); // eslint-disable-line no-console
  });

module.exports = { db, resetDb };