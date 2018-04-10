const mongoose = require('mongoose');
const { Holdings, Transactions } = require('./models');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nestegg');

const db = mongoose.connection;

db.on('error', () => {
  console.error('Mongoose connection error.');
});

db.on('open', () => {
  // db.dropCollection('holdings', (err, data) => {
  //   if (err) {
  //     console.error('Nothing in holdings collection.', err);
  //   } else {
  //     console.log('Done dropping holdings collection.');
  //   }
  // });

  // db.dropCollection('transactions', (err, data) => {
  //   if (err) {
  //     console.error('Nothing in transactions collection.', err);
  //   } else {
  //     console.log('Done dropping transactions collection.');
  //   }
  // });
  Holdings.collection.drop()
  .then(() => {
    console.log('Holdings collection dropped.');
    return Transactions.collection.drop();
  })
  .then(() => {
    console.log('Transactions collection dropped.');
    db.close();
  })
  .catch(err => {
    console.log('Some or all collections were unavailable to drop. Closing connection anyway.', err);
    db.close();
  });
});