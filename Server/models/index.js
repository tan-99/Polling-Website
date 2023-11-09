const mongoose = require('mongoose')

mongoose.set('debug', true)

const mongoURI = 'mongodb://127.0.0.1:27017/polling'

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((error) => {
        console.error('MongoDB connection error: ', error)
    })

module.exports.User = require('./User')
module.exports.Poll = require('./Poll')