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
  getAllHoldings()
  .then(holdings => {
    console.log('Tea with milk:', holdings);
    return getAllTransactions();
  })
  .then(transactions => {
    console.log('Coffee with milk:', transactions);
  })
  .catch(err => {
    console.error('Error finding documents from the Holdings or Transactions collection:', err);
  });
});