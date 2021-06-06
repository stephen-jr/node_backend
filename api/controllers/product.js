const mongoose = require('mongoose');
const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
    Product.find()
    .select('_id name price productImage')
    .exec()
    .then(docs => {
        if(docs){
             const response = {
                 count: docs.length,
                 products: docs
         };
             res.status(200).json(response);
        }else{
             res.status(200).json({
             message: "Empty Entry"
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: error
        });
    });
 }

 exports.getProduct = (req, res, next) => {
    const Id = req.params.productId;
    Product.findById(Id)
    .select('_id name price productImage')
    .exec()
    .then(doc => {
        if(doc){
            const response = {
                product : doc,
                request : {
                    type : 'GET',
                    url : 'http://localhost:' + process.env.PORT + '/product/' + doc._id
                }
            };
            res.status(200).json(response);
        }else{
            res.status(404).json({
                message: "No entry found for provided product ID"
            });
        }
        
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}

exports.createProduct = (req, res, next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage: req.file.path
    });
    product
    .save()
    .then(result =>{
        res.status(201).json({
            message: "Product created successfully",
            request: {
                type: 'POST',
                url: "http://localhost:" + process.env.PORT + "/product/" + product._id
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
}

exports.editProduct = (req, res, next) => { 
    const id = req.params.productId;
    Product.update({_id : id}, { $set: req.body})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Product Updated Sucesfully",
            request: {
                type: 'PATCH',
                url: "http://localhost" + process.env.PORT + "/product/" + id
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        });
    });
}

exports.deleteProduct = (req, res, next) => {
    id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Product deleted succesfully",
            metadata: result,
            request: {
                type: 'DELETE'
            }
        });
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}