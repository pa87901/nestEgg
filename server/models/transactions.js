const { db } = require('../../database');

const getAll = () => db.many('SELECT * FROM transactions');

const deleteTransactions = ids => ids;

const addTransaction = ticket => {
  console.log('Received ticket to enter new transaction:', ticket);
  const { symbol, transactiontype, date, price } = ticket;
  let { shares } = ticket;
  shares = transactiontype === 'Buy' ? shares : -shares;
  return db.one('INSERT INTO transactions (symbol, transactiontype, date, shares, price) VALUES ($1, $2, $3, $4, $5) RETURNING *', [symbol, transactiontype, date, shares, price]
  );
};

// This will be called at the same time as addTransaction to affect an existing symbol holding.
const addExistingHolding = ticket => ticket;

// This will be called at the same time as addTransaction to add a new symbol holding.
const addNewHolding = ticket => ticket;


module.exports = {
  getAll,
  deleteTransactions,
  addTransaction,
  addExistingHolding,
  addNewHolding
};