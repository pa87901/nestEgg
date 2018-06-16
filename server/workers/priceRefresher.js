const cron = require('node-cron');

// Cron is set to update holdings prices at 12am midnight every Monday - Friday
// cron.schedule('0 0 * * 1-5', () => {
cron.schedule('* * * * *', () => {
  const mongoose = require('mongoose');
  const Promise = require('bluebird');
  const request = Promise.promisify(require('request'));
  const { getAllHoldings, updateHoldingPrice } = require('../../database-mongodb/models/holdings');
  const apiKey = require('../../secrets/alphavantageAPIKey')

  Promise.promisifyAll(mongoose);
  Promise.promisifyAll(request);
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/nestegg');

  getAllHoldings()
  .then(holdings => {
    holdings.forEach(holding => {
      const { symbol, currentprice } = holding;
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
      const options = {
        method: 'GET',
        url,
        qs: {
          function: 'TIME_SERIES_DAILY',
          symbol,
          apiKey
        },
        headers: {
          'content-type': 'application/json'
        }
      }
      request(options)
      .then(res => {
        const fields = res.body;
        const obj = JSON.parse(fields);
        const mine = obj['Time Series (Daily)'];
        const latestPrices = Object.keys(mine)[0];
        const latestClosePrice = mine[latestPrices]['4. close'];
        console.log(latestClosePrice);
        const payload = {
          symbol,
          lastprice: currentprice,
          currentprice: latestClosePrice
        };
        return updateHoldingPrice(payload);
      })
      .then(resMsg => {
        console.log('Successfully updated latest price', resMsg);
      })
      .catch(err => {
        throw new Error('Darn', err);
      });
    });
  })
  .catch(err => {
    console.error('Unable to get all holdings', err);
  });
});