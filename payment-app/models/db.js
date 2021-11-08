const mongoose = require('mongoose');

db = mongoose.connection.useDb('payment');

module.exports = db;