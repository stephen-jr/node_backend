/*jshint esversion : 6 */
const mongoose = require('mongoose');
const db = require('./db');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {
        type: String, 
        required:true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required:true},
    role:{type: String, default: 'merchant'},
    created_at: {type:Date, default: new Date().toUTCString() },
    record_status: { type: Boolean, default: true }
});

module.exports = db.model('Customer', customerSchema);