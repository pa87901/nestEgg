const mongoose = require('mongoose');
const { Holdings, Transactions } = require('./models');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/nestegg");

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.on('open', () => {
  console.log('mongoose connected successfully');
  Holdings.findOne({ 'name': 'Microsoft Corporation' }, (err, holdings) => {
    if (err) {
      console.error('Error finding one document from the Holdings collection:', err);
    } else {
      // console.log('BAM BAM %s %s %s', holdings.name, holdings.symbol, holdings.shares);
      console.log('Tea:', holdings);
    }
  });

  Transactions.find({}, (err, transactions) => {
    if (err) {
      console.error('Error with :(', err);
    } else {
      console.log('Coffee:', transactions);
    }
  });
});