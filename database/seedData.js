const pgp = require('pg-promise')();
const fetch = require('isomorphic-fetch');
const alphavantageSecrets = require('../secrets/alphavantageAPIKey');

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'nestegg'
}
const db = pgp(connection);
const values = require('./dummyData2');

const csHoldings = new pgp.helpers.ColumnSet(['name', 'symbol', 'lastprice', 'currentprice', 'shares', 'costprice'], {table: 'holdings'});
const alphavantageAPIKey = alphavantageSecrets.key;
const alphavantageAPIURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMZN&apikey=${alphavantageAPIKey}`;
const options = {
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${alphavantageAPIKey}`
  },
  mode: 'cors',
  json: true
};
fetch(alphavantageAPIURL, options)
.then(res => res.json())
.then(resJSON => {
  console.log('Something from Alphavantage api:', resJSON);
})
.catch(err => {
  console.error('Error fetching stock prices', err);
})

const valuesHoldings = pgp.helpers.insert(values, csHoldings);

const csTransactions = new pgp.helpers.ColumnSet(['symbol', 'transactiontype', 'date', 'shares', 'price'], {table: 'transactions'});
const valuesTransactions = pgp.helpers.insert(values, csTransactions);

const seedData = () => (
  db.none('TRUNCATE holdings RESTART IDENTITY CASCADE')
  .then(() => {
    console.log('holdings table emptied. Now seeding with dummy holdings data.'); // eslint-disable-line no-console
    return db.none(valuesHoldings);
  })
  .then(() => {
    console.log('holdings table seeded.'); // eslint-disable-line no-console
    return db.none('TRUNCATE transactions RESTART IDENTITY CASCADE');
  })
  .then(() => {
    console.log('transactions table has been emptied. Now seeding with dummy transactions data.'); // eslint-disable-line no-console
    return db.none(valuesTransactions);
  })
  .then(() => {
    console.log('Data seeding completed.'); // eslint-disable-line no-console
  })
  .catch(err => console.error('Data seeding encountered an error:', err)) // eslint-disable-line no-console
);

seedData();