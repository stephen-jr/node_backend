const mongoose = require('mongoose');

const Contract = require('../models/contract');

const handleError = err =>{
    res.status(500).json({
        message: 'error',
        error: err
    });
}

const handleQuery = (req, res, next) => {
    const action = req.query.action;
    if(action){
        switch(action){
            case 'getUserContracts':
                getUserContracts(req, res, next);
                break;
            default : create(req, res, next);
                break;
        }
    }else return create(req, res, next);
}

const getAllContracts = (req, res, next) => {
    Contract.find()
    .and({ record_status: true })
    .exec()
    .then(docs => {
        if(docs){
            const response = {
                status: 'success',
                count: docs.length,
                contracts: docs
        };
            res.status(200).json(response);
        }
    })
    .catch(error => handleError(error));
}

const getUserContracts = (req, res, next) => {
    Contract.find({
        $or:[{ assignor: req.body.userData.id }, { assignee: req.body.userData.id }]
    })
    .and({ record_status: true })
    .exec()
    .then(docs => {
        if(docs){
            res.status(200).json({
                status: 'success',
                count: docs.length,
                data: docs
        });
        }
    })
    .catch(error => handleError(error));
}

const getContractDetails = (req, res, next) => {
    Contract.findById(req.params.contractId)
    .exec()
    .then(doc => {
        if(doc){
            const response = {
                status: 'success',
                data: doc
            }
            res.status(200).json(response);
        }
    })
    .catch(error => handleError(error));
}

const create = (req, res, next) => {
    const contract = new Contract({
        _id : new mongoose.Types.ObjectId(),
        assignor: req.body.assignor,
        assignee: req.body.assignee,
        type: req.body.type,
        description: req.body.description
    });
    contract
    .save()
    .then(result => {
        res.status(201).json({
            status: 'success',
            message: "Contract created successfully",
            data: result
        });
    })
    .catch(error => handleError(error));
}


const endContract = (req, res, next) => {
    Contract.replaceOne({_id : req.params.contractId}, {status: 'inactive'})
    .exec()
    .then(result => {
        res.status(200).json({
            status: 'success',
            message: 'Contract Terminated',
            data: result
        });
    })
    .catch(err => handleError(err));
}

const deleteContract = (req, res, next) => {
    Contract.replaceOne({_id : req.params.contractId}, {record_status: false})
    .exec()
    .then(result => {
        res.status(200).json({
            status: 'success',
            message: 'Contract Deleted',
            data: result
        });
    })
    .catch(err => handleError(err));
}


module.exports = { 
    getAllContracts, 
    getContractDetails,  
    endContract, 
    deleteContract,
    handleQuery
 }