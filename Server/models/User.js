const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    created: { 
        type: Date, 
        default: Date.now 
    },

    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]
})

//executes function before saving 
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next()
        }
        const hashed = await bcrypt.hash(this.password, 10)
        this.password = hashed
        return next()
    }
    catch(err){
        return next(err)
    }
})

userSchema.methods.comparePassword = async function(attempt, next){
    try{
        const verdict = await bcrypt.compare(attempt, this.password)
        return verdict
    }
    catch(err){
        return next(err)
    }
}

//do bcrypt basics and express router basics

module.exports = mongoose.model('User', userSchema)