const mongoose = require('mongoose');

const db = mongoose.connection.useDb('api');

module.exports = db;