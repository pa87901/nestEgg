const mongoose = require('mongoose');
const Promise = require('bluebird');
const { holdingsSchema, transactionsSchema } = require('./schema');

Promise.promisifyAll(mongoose);

const Holdings = mongoose.model('Holdings', holdingsSchema);
const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = {
  Holdings,
  Transactions
}