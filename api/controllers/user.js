const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signUp = (req, res, next)=>{
    User.find({ email: req.body.email }).exec().then(user =>{
        if(user.length >= 1){
           return res.status(409).json({
                message : "User already exists"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User Created Successfully',
                            data: result
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

exports.login = (req, res, next)=>{
    User.findOne({ email: req.body.email}).exec().then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, result)=>{
                if(err){
                    return res.status(401).json({
                        message: 'Authentication Failed'
                    });
                }
                if(result){
                    const token = jwt.sign(
                        {
                            userId : user._id,
                            userEmail: user.email
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

exports.deleteUser = (req, res, next)=>{
    const userId = req.params.userId;
    User.remove( { _id : userId } ).exec().then(result => {
        res.status(200).json({
            message : 'User deleted successfully'
        });
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    });
}