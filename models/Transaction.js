const { Schema, model } = require("mongoose");
//IMPORT FOR GETTER FUNCTIONALITY
// const dateFormat = require('../utils/dateFormat');

// const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Enter a name for transaction"
        },
        value: {
            type: Number,
            required: "Enter an amount"
        },
        date: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => dateFormat(createdAtVal)
        }
    }
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true
    //     },
    //     //MONGOOSE RETURNS THIS VIRTUAL SO THE ID IS NA
    //     id: false
    // }
);

const Transaction = model('Transaction', TransactionSchema);

module.exports = Transaction;
