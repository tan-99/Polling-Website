const jwt = require('jsonwebtoken')

//no module cuz already spread out in index of handlers
const db = require('../models')

exports.register = async (req, res, next) => {
    try{
        const user = await db.User.create(req.body)
        const { id, username } = user

        const token = jwt.sign({ id, username }, process.env.SECRET)

        res.status(201).json({
            id, 
            username, 
            token
        })    //201 status code for when something is created
    }
    catch(err){
        if(err.code === 11000){
            err.message = 'Sorry, this username is already taken'
        }
        return next(err)
    }
}

exports.login = async (req, res, next) => {
    try{
        const user = await db.User.findOne({ username: req.body.username })
        if(user){
            const valid = await user.comparePassword(req.body.password)
            const { id, username } = user

            if(valid){

                const token = jwt.sign({ id, username }, process.env.SECRET)
                
                res.status(200).json({
                    id,
                    username,
                    token
                })
            }
            else{
                throw new Error('Invalid Credentials')
            }
        }
        else{
            throw new Error('Login Failed: This account is not registered. Please check your credentials or sign up for an account if you have not already.')
        }
    }
    catch(err){
        next(err)
    }
}