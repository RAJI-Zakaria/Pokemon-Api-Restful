//create hello world app with user endpoint which redirect to the UserRoute, also add Json format validation

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const port = 3000
//add json parser middleware for parsing request bodies into JSON objects.
app.use(bodyParser.json())

//add user route
app.use('/user', userRoute)

//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
