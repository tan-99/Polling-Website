const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
})

const pollSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: { 
        type: Date, 
        default: Date.now 
    },
    question: {
        type: String,
        required: true
    },
    options: [optionSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Poll', pollSchema)