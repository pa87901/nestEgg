const mongoose = require('mongoose');


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

module.exports = {
  holdingsSchema,
  transactionsSchema
};