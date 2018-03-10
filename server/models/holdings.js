const { db } = require('../../database');

const getAll = () => db.many('SELECT * FROM holdings');

module.exports = { getAll }