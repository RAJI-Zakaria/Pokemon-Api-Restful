//import config
const config = require('../config/config.json')

const password = config.DEV.Password

module.exports = (req, res, next) => {
  // Verify if we received a password in the header:
  const requestPassword = req.headers['x-password']

  if (!requestPassword) {
    return res.status(400).json({ error: 'Password is missing in the header' })
  }

  // Verify if the password is correct:
  if (requestPassword !== password) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  next()
}
