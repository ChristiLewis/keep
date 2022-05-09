//IMPORT THE MODEL(S) 
const { Transaction } = require('../models');

const transactionController = {
    //FUNCTIONS AS METHODS GO HERE

    //GET ALL
    getAllTransaction(req, res) {
        Transaction.find({}).sort({ date: -1 })
            //OTHER METHODS CAN GO HERE
            //POPULATE - BUT WE DO NOT HAVE ANY OTHER MODELS TO LINK YET
            /*
            .populate({
                path: '<lowerCasePluralModelName>',
                select: '-__v'
            })
           
            //ADD SELECT TO SHOW THE _VFIELD FOR THIS MODEL
            .select('__v')
            //PROVIDED SORT METHOD IN DESCENDING ORDER
            .sort({ date: -1 })
            //STANDARD THEN AND CATCH METHODS
            .then(dbTransactionData => res.json(dbTransactionData))
            .catch(err => {
                res.status(400).json(err);
            });
             */
            .then(dbTransaction => {
                res.json(dbTransaction);
            })
            .catch(err => {
                res.status(404).json(err);
            });

    },

    //GET ONE BY ID

    getTransactionById({ params }, res) {
        Transaction.findOne({ _id: params.id })
            //POPULATE CODE FOR FUTURE

            .populate({
                path: '<lowerCasePluralModelName>',
                select: '-__v'
            })

            //ADD SELECT TO SHOW THE _VFIELD FOR THIS MODEL
            .select('__v')
            //STANDARD THEN AND CATCH METHODS
            .then(dbTransactionData => {
                if (!dbTransactionData) {
                    res.status(404).json({ message: 'No Transaction found with this id!' });
                    return;
                }
                res.json(dbTransactionData);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },


    //CREATE MODEL
    createTransaction({ body }, res) {
        /*
        Transaction.create(body)
            .then(dbTransactionData => res.json(dbTransactionData))
            .catch(err => res.status(400).json(err));
        */
        Transaction.create(body)
            .then(dbTransaction => {
                res.json(dbTransaction);
            })
            .catch(err => {
                res.status(404).json(err);
            });
    },


    insertManyTransaction({ body }, res) {
        Transaction.insertMany(body)
        //OTHER METHODS CAN GO HERE
        //POPULATE - BUT WE DO NOT HAVE ANY OTHER MODELS TO LINK YET
        /*
        .populate({
            path: '<lowerCasePluralModelName>',
            select: '-__v'
        })
        
        //ADD SELECT TO SHOW THE _VFIELD FOR THIS MODEL
        .select('__v')
        //PROVIDED SORT METHOD IN DESCENDING ORDER
        .sort({ date: -1 })
        //STANDARD THEN AND CATCH METHODS
        .then(dbTransactionData => res.json(dbTransactionData))
        .catch(err => {
            res.status(400).json(err);
        })*/
        Transaction.insertMany(body)
            .then(dbTransaction => {
                res.json(dbTransaction);
            })
            .catch(err => {
                res.status(404).json(err);
            });
    },

    //UPDATE MODEL

    updateTransaction({ params, body }, res) {
        //ADD VALIDATOR OPTION SETTING
        Transaction.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbTransactionData => {
                if (!dbTransactionData) {
                    res.status(404).json({ message: 'No Transaction found with this id!' });
                    return;
                }
                res.json(dbTransactionData);
            })
            .catch(err => res.status(400).json(err));
    },

    //DELETE MODEL
    deleteTransaction({ params }, res) {
        Transaction.findOneAndDelete({ _id: params.id })
            .then(dbTransactionData => {
                if (!dbTransactionData) {
                    res.status(404).json({ message: 'No Transaction found with this id!' });
                    return;
                }
                res.json(dbTransactionData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = transactionController;