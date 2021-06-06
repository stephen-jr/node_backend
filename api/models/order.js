/*jshint esversion : 6 */

const mongoose = require('mongoose');
const db = require('./db');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {
        type : mongoose.Schema.Types.ObjectId, 
        ref:'Product', 
        required : true
    },
    quantity: {
        type : Number, 
        default : 1
    }
});

module.exports = db.model('Order', orderSchema);