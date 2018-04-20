const mongoose = require('mongoose');
const { transactionsSchema } = require('../schema');

const Transactions = mongoose.model('Transactions', transactionsSchema);

const getAll = callback => {
  Transactions.find({}, (err, transactions) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, transactions);
    }
  });
};

const deleteTransactions = (symbols, callback) => {
  Transactions.remove({ symbol: { $in: symbols } }, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
 });
};

const addTransaction = (ticket, callback) => {
  const { symbol, transactiontype, date, price } = ticket;
  let { shares } = ticket;
  shares = transactiontype === 'Buy' ? shares : -shares;
  Transactions.create({ symbol, transactiontype, date, shares, price }, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
  })
};


module.exports = {
  getAll,
  deleteTransactions,
  addTransaction
}