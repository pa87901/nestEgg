const mongoose = require('mongoose');
const Promise = require('bluebird');
const { transactionsSchema } = require('../schema');

const Transactions = mongoose.model('Transactions', transactionsSchema);

const getAllTransactions = () => (
  new Promise((resolve, reject) => {
    Transactions.find({}, (err, transactions) => {
      if (err) {
        reject(err);
      } else {
        resolve(transactions);
      }
    });
  })
);

const deleteAllHoldingTransactions = symbols => (
  new Promise((resolve, reject) => {
    Transactions.remove({ symbol: { $in: symbols } }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  })
);

const deleteTransactions = ids => (
  new Promise((resolve, reject) => {
    Transactions.remove({ _id: { $in: ids } }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  })
);

const addTransaction = ticket => {
  const { symbol, transactiontype, date, price } = ticket;
  let { shares } = ticket;
  shares = transactiontype === 'Buy' ? shares : -shares;
  return new Promise((resolve, reject) => {
    Transactions.create({ symbol, transactiontype, date, shares, price }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

const getSelectedTransactions = ids => (
  new Promise((resolve, reject) => {
    Transactions.find({ _id: { $in: ids } }, (err, transactions) => {
      if (err) {
        reject(err);
      } else {
        resolve(transactions);
      }
    });
  })
);

const getRemainingTransactions = symbols => (
  new Promise((resolve, reject) => {
    Transactions.find({ symbol: { $in: symbols} }, (err, transactions) => {
      if (err) {
        reject(err);
      } else {
        resolve(transactions);
      }
    });
  })
);


module.exports = {
  getAllTransactions,
  deleteAllHoldingTransactions,
  deleteTransactions,
  addTransaction,
  getSelectedTransactions,
  getRemainingTransactions
}