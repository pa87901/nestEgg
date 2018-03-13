const { db } = require('../../database');

const getAll = () => db.many('SELECT * FROM holdings');

const deleteHoldings = ids => {
  let numberToDelete = ids.length;
  let string = '(';
  let anotherId = 1;
  while (numberToDelete > 0) {
    if (anotherId === 1) {
      string = `${string}$${anotherId}`;
    } else {
      string = `${string}, $${anotherId}`;
    }
    numberToDelete -= 1;
    anotherId +=1;
  }
  string = `${string})`;
  return db.result(`DELETE FROM holdings WHERE id IN ${string} RETURNING *`, ids);
}

const addTrade = ticket => {
  const { symbol, type, costPrice, } = ticket;
  let { shares } = ticket;
  shares = type === 'buy' ? shares : -shares;
  return db.one('INSERT INTO holdings (name, symbol, lastprice, currentprice, shares, costprice) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [symbol, symbol, costPrice, costPrice, shares, costPrice]
  );
}

module.exports = {
  getAll,
  deleteHoldings,
  addTrade
}