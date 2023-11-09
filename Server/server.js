const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// import handlers file
const handlers = require('./handlers')
// import all routes
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("hello world!")
})

//this will take care of all routes for this endpoint
app.use('/api/auth', routes.auth)
app.use('/api/polls', routes.poll)

app.use(handlers.notFound)
app.use(handlers.errors)

app.listen(PORT, console.log('Server started on port 4000'))