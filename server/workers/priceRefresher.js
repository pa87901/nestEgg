'use strict'
const cron = require('node-cron');

// Cron is set to update holdings prices at 12am midnight every Monday - Friday
cron.schedule('0 0 * * 1-5', () => {
  const request = require('request');
  const mongoose = require('mongoose');
  const Promise = require('bluebird');
  const { getAllHoldings, updateHoldingPrice } = require('../../database-mongodb/models/holdings');
  const apiKey = require('../../secrets/alphavantageAPIKey')

  Promise.promisifyAll(mongoose);

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
      request(options, (err, response, fields) => {
        if (err) {
          throw new Error(err);
        }
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
        updateHoldingPrice(payload)
        .then(res => {
          console.log('Successfully updated latest price', res);
        })
        .catch(err => {
          console.error('Darn', err);
        });
      });
    });
  })
  .catch(err => {
    console.error('Unable to get all holdings', err);
  });
});