const { MongoClient } = require('mongodb');

const uri = 'mongodb://elice:1234@localhost:27017/elice9';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;