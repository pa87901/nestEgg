const mongoose = require('mongoose');
const Promise = require('bluebird');
const { holdingsSchema, transactionsSchema } = require('./schema');
const { holdings, transactions } = require('./dummyData');

Promise.promisifyAll(mongoose);
const Holdings = mongoose.model('Holdings', holdingsSchema);
const Transactions = mongoose.model('Transactions', transactionsSchema);

// const { Holdings, Transactions } = require('./models');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nestegg');

const db = mongoose.connection;

db.on('error', () => {
  console.error('Mongoose connection error.');
});

db.on('open', () => {
  Holdings.collection.drop()
  .then(() => {
    console.log('Holdings collection dropped. Inserting dummy holdings...');
    return Holdings.insertMany(holdings);
  })
  .then(() => {
    console.log('Inserted dummy holdings. Now to drop the transactions collection...');
    return Transactions.collection.drop();
  })
  .then(() => {
    console.log('Transactions collection dropped. Inserting dummy transactions...');
    return Transactions.insertMany(transactions);
  })
  .then(() => {
    console.log('My job is done. Closing the connection to the MongoDB.');
    db.close();
  })
  .catch(err => {
    console.log('Some or all collections were unavailable to drop. Closing connection anyway.', err);
    db.close();
  });
});