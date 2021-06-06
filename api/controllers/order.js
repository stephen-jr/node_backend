const mongoose = require('mongoose');
const Order = require('../models/order');

exports.getOrder = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
    .select('_id productId quantity')
    .exec()
    .then(doc =>{
        if(doc){
            const response = {
                order : doc,
                request : {
                    type : 'GET',
                    url : 'http://localhost:' + process.env.PORT + '/order/' + doc._id
                }
            };
            res.status(200).json(response);
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    })
}

exports.getAllOrders = (req, res, next) => {
    Order.find()
    .select('_id productId quantity')
    .exec()
    .then(docs =>{
        if(docs){
            const response = {
                count : docs.length,
                orders : docs,
                request : {
                    type : 'GET',
                    url : 'http://localhost:' + process.env.PORT + '/order/'
                }
            };
            res.status(200).json(response);
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
}

exports.createOrder = (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order.save().exec().then(result => {
        if(result){
            res.status(201).json({
                message: 'Order Created Successfully',
                info: result
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.deleteOrder = (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id : id}).exec().then(result => {
        res.status(200).json({
            message: 'Order Deleted Successfully',
            meta: result
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            error: err
        });
    });
}