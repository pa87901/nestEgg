const schema = db => (
db.query('CREATE TABLE IF NOT EXISTS holdings(\
  id SERIAL PRIMARY KEY,\
  name VARCHAR(50) NOT NULL,\
  symbol VARCHAR(10) NOT NULL,\
  lastPrice INTEGER NOT NULL,\
  currentPrice INTEGER NOT NULL,\
  shares INTEGER NOT NULL,\
  costPrice INTEGER NOT NULL\
  );')
  .then(() => (
    db.query('CREATE TABLE IF NOT EXISTS transactions(\
      id SERIAL PRIMARY KEY,\
      symbol VARCHAR(10) NOT NULL,\
      transactionType VARCHAR(10) NOT NULL,\
      date DATE NOT NULL,\
      shares INTEGER NOT NULL,\
      price DECIMAL NOT NULL);')
    ))
  .catch(err => {
    console.error('Error creating tables in nest-egg database:', err); // eslint-disable-line no-console
  })
);

module.exports = schema;