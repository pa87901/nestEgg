const mongoose = require('mongoose');

const holdingsSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  lastPrice: Number,
  currentPrice: Number,
  shares: Number,
  costPrice: Number
});

const transactionsSchema = new mongoose.Schema({
  symbol: String,
  transactionType: String,
  date: Date,
  shares: Number,
  price: Number
});

const Holdings = mongoose.model("Holdings", holdingsSchema);
const Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = {
  Holdings,
  Transactions
}