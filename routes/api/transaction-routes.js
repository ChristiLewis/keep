//SET-UP FOR EXPRESS.JS
const router = require('express').Router();

//IMPORT FUNCTIONALITY VIA CONTROLLER METHODS
const {
    getAllTransaction,
    getTransactionById,
    createTransaction,
    insertManyTransaction,
    updateTransaction,
    deleteTransaction
} = require('../../controllers/transaction-controller');

//SET GET AND POST ROUTES TO  /API/TRANSACTIONS
router
    .route('/')
    .get(getAllTransaction)
    .post(createTransaction);

//SET POST ROUTES TO  /API/TRANSACTIONS/BULK
router
    .route('/bulk')
    .post(insertManyTransaction);

//SET GET ONE, PUT, AND DELETE AT /API/TRANSACTIONS/:ID
router
    .route('/:id')
    .get(getTransactionById)
    .put(updateTransaction)
    .delete(deleteTransaction);

module.exports = router;