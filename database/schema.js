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
  .catch(err => {
    console.error('Error creating tables in nest-egg database:', err);
  })
);

module.exports = schema;