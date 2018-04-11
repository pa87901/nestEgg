const mongoose = require('mongoose');
const Promise = require('bluebird');

Promise.promisifyAll(mongoose);

const holdingsSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  lastprice: Number,
  currentprice: Number,
  shares: Number,
  costprice: Number
});

const transactionsSchema = new mongoose.Schema({
  symbol: String,
  transactiontype: String,
  date: Date,
  shares: Number,
  price: Number
});

const Holdings = mongoose.model('Holdings', holdingsSchema);
const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = {
  Holdings,
  Transactions
}