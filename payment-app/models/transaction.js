/*jshint esversion : 6 */
const { Schema } = require('mongoose');
const db = require('./db');

const transactionSchema = Schema({
    _id: Schema.Types.ObjectId,
    contract: {
        type : Schema.Types.ObjectId, 
        ref:'Contract', 
        required : true
    },
    partition: {type: Number, default: 1},
    status: {type: String, enum:['pending', 'completed'], default: 'pending'},
    created_at: {type:Date, default: new Date().toUTCString() },
    record_status: { type: Boolean, default: true }
});

module.exports = db.model('Transaction', transactionSchema);