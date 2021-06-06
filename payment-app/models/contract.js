/*jshint esversion : 6 */
const mongoose = require('mongoose');
const db = require('./db');

const contractSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    assignor: {
        type : mongoose.Schema.Types.ObjectId, 
        ref:'Customer', 
        required : true
    },
    assignee: {
        type : mongoose.Schema.Types.ObjectId, 
        ref:'Customer', 
        required : true
    },
    type: String,
    description: String,
    status: { type: String, default: 'active' },
    created_at: { type:Date, default: new Date().toUTCString() },
    record_status: { type: Boolean, default: true }
});

module.exports = db.model('contract', contractSchema);