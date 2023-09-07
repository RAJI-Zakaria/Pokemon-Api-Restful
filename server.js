const app = require('./app')
const PORT = process.env.PORT || 3000

/* Connecting to the database and then starting the server. */
//start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
