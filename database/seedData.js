const pgp = require('pg-promise')();
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'nestegg'
}
const db = pgp(connection);
const values = require('./dummyData');

const csHoldings = new pgp.helpers.ColumnSet(['name', 'symbol', 'lastprice', 'currentprice', 'shares', 'costprice'], {table: 'holdings'});
const valuesHoldings = pgp.helpers.insert(values, csHoldings);

const seedData = () => (
  db.none('TRUNCATE holdings RESTART IDENTITY CASCADE')
  .then(() => {
    console.log('All tables have been emptied.');
    return db.none(valuesHoldings);
  })
  .then(() => {
    console.log('holdings table seeded.');
    console.log('Data seeding completed.');
  })
  .catch(err => console.error('Data seeding encountered an error:', err))
);

seedData();