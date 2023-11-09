//spreading out every single handler in auth
module.exports = {
    ...require('./auth'),
    ...require('./poll')
}

module.exports.errors = (err, req, res, next) => {
    res.status(err.status || 400).json({
        "message" : err.message||"Something is wrong",
        "status": err.status||400
    })
} 

module.exports.notFound = (req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404

    next(err)
}