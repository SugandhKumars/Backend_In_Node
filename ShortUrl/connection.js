const mongoose = require("mongoose");

async function addToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = { addToMongoDB };
