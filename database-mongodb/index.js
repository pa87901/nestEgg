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
  Holdings.findOne({ 'name': 'Microsoft Corporation' }, 'name symbol shares', (err, holdings) => {
    if (err) {
      console.error('Error with <3:', err);
    } else {
      console.log('BAM BAM %s %s %s', holdings.name, holdings.symbol, holdings.shares);
    }
  });
});