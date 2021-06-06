/*jshint esversion : 6 */

const { Schema } = require('mongoose');
const db = require('./db');

const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {type : String, required : true},
    price: {type : Number, required : true},
    productImage: { type: String, require : true }
});

module.exports = db.model('Product', productSchema);