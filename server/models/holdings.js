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

module.exports = {
  getAll,
  deleteHoldings
}