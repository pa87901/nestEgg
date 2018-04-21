const mongoose = require('mongoose');
const { getAllHoldings } = require('./models/holdings');
const { getAllTransactions } = require('./models/transactions');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nestegg');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.on('open', () => {
  console.log('mongoose connected successfully');
  // Testing the Holdings model works.
  getAllHoldings()
  .then(holdings => {
    console.log('Tea with milk:', holdings);
  })
  .catch(err => {
    console.error('Error finding one document from the Holdings collection:', err);
  });
  // Testing the Transactions model works.
  getAllTransactions()
  .then(transactions => {
    console.log('Coffee with milk:', transactions);
  })
  .catch(err => {
    console.error('Bad transactions error :((', err);
  });
});