const holdings = [
  {
    name: "Microsoft Corporation",
    symbol: "MSFT",
    lastprice: 92.3300,
    currentprice: 92.3800,
    shares: 100,
    costprice: 90.0000
  },
  {
    name: "Facebook",
    symbol: "FB",
    lastprice: 155.1000,
    currentprice: 159.3400,
    shares: 100,
    costprice: 150.0000
  },
  {
    name: "Amazon",
    symbol: "AMZN",
    lastprice: 1410.5700,
    currentprice: 1451.7500,
    shares: 10,
    costprice: 1500.0000
  }
];

const transactions = [
  {
    symbol: "MSFT",
    transactiontype: "Buy",
    date: "2018-01-02",
    shares: 100,
    price: 90.0000
  },
  {
    symbol: "FB",
    transactiontype: "Buy",
    date: "2018-02-05",
    shares: 100,
    price: 150.0000
  },
  {
    symbol: "AMZN",
    transactiontype: "Buy",
    date: "2018-03-12",
    shares: 10,
    price: 1500.0000
  }
]

module.exports = { holdings, transactions };