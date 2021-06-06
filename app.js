/* jshint esversion :6  */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useMongoClient: true}, err => { if(err) console.error( Error(err) ) });
mongoose.Promise = global.Promise;

const app = express();

//API
const apiProductRouter = require('./api/routes/products');
const apiOrderRouter = require('./api/routes/order');
const apiUserRouter = require('./api/routes/user');

//PAYMENT
const customerRouter = require('./payment-app/routes/customer');
const contractRouter = require('./payment-app/routes/contract');
const transactionRouter = require('./payment-app/routes/transaction');

app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());


//CORS manual implementation
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Authorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});*/

//API
app.use('/api/product', apiProductRouter);
app.use('/api/order', apiOrderRouter);
app.use('/api/user', apiUserRouter);

//PAYMENT APP
app.use('/payment/customer', customerRouter);
app.use('/payment/contract', contractRouter)
app.use('/payment/transaction', transactionRouter)

app.use((req, res, next)=>{
  const err = Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next)=>{
  res.status(error.status || 500).json({
    message: 'default error',
    error:error
  });
});

module.exports = app;