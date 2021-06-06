const mongoose = require('mongoose');

const Transaction = require('../models/transaction');

const handleError = err =>{
    res.status(500).json({
        message: 'error',
        error: err
    });
}

const getAll = (req, res, next) => {
    Transaction.find()
    .and({ record_status: true })
    .exec()
    .then(docs => {
        if(docs){
            res.status(200).json({
                status: 'success',
                count: docs.length,
                transactions: docs
            });
        }
    })
    .catch(error => handleError(error));
}

const getTransactionDetails = (req, res, next) => {
    Transaction.findById(req.params.transactionId)
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                status: 'success',
                data: doc
            });
        }
    })
    .catch(error => handleError(error));

}

const createTransaction = (req, res, next) => {
    const transaction = new Transaction({
        _id : new mongoose.Types.ObjectId(),
        contract: req.body.contract,
        partition: req.body.partition
    });
    transaction
    .save()
    .then(result => {
        res.status(201).json({
            status: 'success',
            message: "Transaction created successfully",
            data: result
        });
    })
    .catch(error => handleError(error));
}

const completeTransaction = (req, res, next) => {
    if(req.params.transactionId) id = req.params.transactionId;
    else id = req.body.id
    Transaction.replaceOne({_id : id }, {status: 'completed'})
    .exec()
    .then(result => {
        res.status(200).json({
            status: 'success',
            message: 'Transaction Completed',
            data: result
        });
    })
    .catch(err => handleError(err));
}

const deleteTransaction = (req, res, next) => {
    if(req.params.transactionId) id = req.params.transactionId;
    else id = req.body.id
    Transaction.replaceOne({_id : id}, {record_status: false})
    .exec()
    .then(result => {
        res.status(200).json({
            status: 'success',
            message: 'Transaction Deleted',
            data: result
        });
    })
    .catch(err => handleError(err));
}


module.exports = { getAll, getTransactionDetails,  createTransaction, completeTransaction, deleteTransaction }