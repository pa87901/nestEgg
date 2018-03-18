const { db } = require('../../database');

const getAll = () => db.many('SELECT * FROM holdings');

const getOne = symbol => db.one('SELECT * FROM holdings WHERE symbol = $1', symbol);

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
};

const addTrade = ticket => {
  const { symbol, type, price } = ticket;
  let { shares } = ticket;
  shares = type === 'Buy' ? shares : -shares;
  return db.one('INSERT INTO holdings (name, symbol, lastprice, currentprice, shares, costprice) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [symbol, symbol, price, price, shares, price]
  );
};

const updateExistingHolding = (symbol) => {
  console.log('Given symbol to look up:', symbol);
  // Get the holding from the db.
  return getOne(symbol)
  // Holding symbol exists in the db
  .then(response => {
    console.log('getting holding:', response);
    // Placeholder to create a psql query to update the existing holding
    return response;
  })
  // No such holding in the db currently
  .catch(err => err);
}

module.exports = {
  getAll,
  getOne,
  deleteHoldings,
  addTrade,
  updateExistingHolding
};