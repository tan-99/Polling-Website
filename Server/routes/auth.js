const router = require('express').Router() // instantiate the object
const handlers = require('../handlers')

router.post('/register', handlers.register)

router.post('/login', handlers.login)

module.exports = router