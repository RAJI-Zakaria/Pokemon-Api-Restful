//create hello world app with user endpoint which redirect to the UserRoute, also add Json format validation

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const apiRoutes = require('./routes')
//add json parser middleware for parsing request bodies into JSON objects.
app.use(bodyParser.json())

const verifyAuth = require('./middleware/verifyAuth')

//check the req.body.password ===> look at the config file
app.use(verifyAuth)

//add user route
app.use('/api', apiRoutes)

module.exports = app
