const { db } = require('../../database');

const getAll = () => db.many('SELECT * FROM transactions');

const deleteTransactions = ids => ids;

const addTransaction = ticket => {
  const { symbol, type, date, price } = ticket;
  let { shares } = ticket;
  shares = type === 'Buy' ? shares : -shares;
  return db.one('INSERT INTO transactions (symbol, transactiontype, date, shares, price) VALUES ($1, $2, $3, $4, $5) RETURNING *', [symbol, type, date, shares, price]
  );
};

module.exports = {
  getAll,
  deleteTransactions,
  addTransaction
};