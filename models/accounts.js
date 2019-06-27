const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    balance: {
        type: String,
        default: "0"
    },
    credit: {
        type: Number
    },
    picture: {
        type: String
    },
    name_first: {
        type: String,
        required: true
    },
    name_last: {
        type: String,
        required: true
    },
    employer: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: String,
    comments: String,
    created: {
        type: Date,
        default: Date.now
    },
    tags: [String]

});

module.exports = Account = mongoose.model('account', AccountSchema);