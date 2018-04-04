const { db } = require('../../database');

const getAll = () => db.many('SELECT * FROM holdings');

const getOne = symbol => (
  db.one('SELECT * FROM holdings WHERE symbol = $1', symbol)
  .then(existingHolding => {
    console.log('Symbol exists in the holdings table already.')
    return existingHolding;
  })
  .catch(err => {
    console.log('Symbol does not exist in the holdings table already.', err); // eslint-disable-line no-console
    return 'Symbol does not exist in the holdings table.';
  })
);

const deleteHoldings = symbols => {
  let numberToDelete = symbols.length;
  let string = '(';
  let anotherSymbol = 1;
  while (numberToDelete > 0) {
    if (anotherSymbol === 1) {
      string = `${string}$${anotherSymbol}`;
    } else {
      string = `${string}, $${anotherSymbol}`;
    }
    numberToDelete -= 1;
    anotherSymbol +=1;
  }
  string = `${string})`;
  return db.result(`DELETE FROM holdings WHERE symbol IN ${string} RETURNING *`, symbols);
};

/*
// This method is obsolete as the Holding controller will not itself increase or decrease holdings. This will happen when transactions are entered.
const addTrade = ticket => {
  const { symbol, type, price } = ticket;
  let { shares } = ticket;
  shares = type === 'Buy' ? shares : -shares;
  return db.one('INSERT INTO holdings (name, symbol, lastprice, currentprice, shares, costprice) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [symbol, symbol, price, price, shares, price]
  );
};
*/

const updateExistingHolding = (ticket, existingHolding) => {
  console.log(`This is the ticket to update holding ${ticket.symbol}:`, ticket, ' and existing holding:', existingHolding);
  const { id } = existingHolding;
  // Determine if ticket is a buy or sell
  const ticketShares = (ticket.transactiontype === 'Buy') ? ticket.shares : -ticket.shares;
  // Add the ticket shares, (weight) average the two costPrices
  const totalShares = ticketShares + existingHolding.shares;
  const averageCostPrice = ((ticketShares * ticket.price) + (existingHolding.shares * existingHolding.costprice)) / totalShares;
  // Update the existing holding with a sql query and return
  return db.one('UPDATE holdings SET shares = $1, costPrice = $2 WHERE id = $3 RETURNING *', [totalShares, averageCostPrice, id]);
};

const addNewHolding = ticket => {
  console.log('Received ticket to enter brand new holding:', ticket);
  const { symbol, transactiontype, price } = ticket;
  let { shares } = ticket;
  shares = transactiontype === 'Buy' ? shares : -shares;
  return db.one('INSERT INTO holdings (name, symbol, lastprice, currentprice, shares, costprice) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [symbol, symbol, price, price, shares, price]
  );
};

module.exports = {
  getAll,
  getOne,
  deleteHoldings,
  // addTrade,
  updateExistingHolding,
  addNewHolding
};