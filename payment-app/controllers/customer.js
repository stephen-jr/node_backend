const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Customer = require('../models/customer');

const getAll = (req, res, next) => {
    Customer.find()
    .select('_id firstname lastname role')
    .exec()
    .then(docs => {
        if(docs){
             const response = {
                 count: docs.length,
                 customer: docs
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

const signUp = (req, res, next)=>{
    Customer.find({ email: req.body.email }).exec().then(user =>{
        if(user.length >= 1){
           return res.status(409).json({
                message : "Customer already exists"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    res.status(500).json({
                        error: err
                    });
                }else{
                    const customer = new Customer({
                        _id: mongoose.Types.ObjectId(),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        role: req.body.role,
                        email: req.body.email,
                        password: hash
                    });
                    customer
                    .save()
                    .then(result => {
                        const token = jwt.sign(
                            {
                                id : customer._id,
                                email: customer.email,
                                name: customer.firstname + " " +  customer.lastname
                            },
                            process.env.JWT_KEY,
                            { expiresIn: '1h' }
                        );
                        res.status(201).json({
                            message: 'Customer Created Successfully',
                            token: token
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    });
}

const login = (req, res, next)=>{
    Customer.findOne({ email: req.body.email}).exec().then(customer => {
        if(customer){
            bcrypt.compare(req.body.password, customer.password, (err, result)=>{
                if(err){
                    return res.status(401).json({
                        message: 'Authentication Failed'
                    });
                }
                if(result){
                    const token = jwt.sign(
                        {
                            id : customer._id,
                            email: customer.email,
                            name: customer.firstname + " " + customer.lastname
                        },
                        process.env.JWT_KEY,
                        { expiresIn: '1h' }
                    );
                    res.status(200).json({
                        message : 'Authentication Successful',
                        token: token
                    });
                }
                else{
                    return res.status(401).json({
                        message: 'Authentication Failed',
                        error: 'Invalid Credentials'
                    });
                }
            });
        }else{
            res.status(404).json({
                message: 'Authentication Failed',
                error: 'Invalid User' 
            });
        }
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    });
}

// exports.deleteUser = (req, res, next)=>{
//     const userId = req.params.userId;
//     User.remove( { _id : userId } ).exec().then(result => {
//         res.status(200).json({
//             message : 'User deleted successfully'
//         });
//     }).catch(err => {
//         res.status(500).json({
//             error : err
//         });
//     });
// }

module.exports = { getAll, signUp, login }