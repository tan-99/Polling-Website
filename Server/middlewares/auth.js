const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    //check the headers for the authorization key
    if(req.headers.authorization) {

        // 'Bearer ahsdfedjedfdvbj....'
        // we only want key part
        
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) {
                next(Error('Failed to authenticate token'))
            }
            else{
                req.decoded = decoded
                next()
            }
        })
    }else{
        next(Error('Token not provided'))
    }
}