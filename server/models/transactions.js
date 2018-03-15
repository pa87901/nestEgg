const { db } = require('../../database');

const getAll = () => db.many('SELECT * FROM transactions');

const deleteTransactions = ids => ids;

const addTrade = ticket => ticket;

module.exports = {
  getAll,
  deleteTransactions,
  addTrade
};