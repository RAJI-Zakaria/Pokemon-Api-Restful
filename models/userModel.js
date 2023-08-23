const fs = require('fs')
const path = require('path')

// Load data from JSON files
const userDataPath = path.join(__dirname, '../data/users.json')

// Helper function to read user data
function readUserData() {
  return JSON.parse(fs.readFileSync(userDataPath, 'utf8'))
}

// Helper function to write user data
function writeUserData(data) {
  fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), 'utf8')
}

const model = {}

model.getAllUsers = async () => {
  const users = readUserData()
  return users
}

model.getUser = async (id) => {
  const users = readUserData()
  const user = users.find((p) => p.id === id)
  return user || null
}

model.deleteUser = async (id) => {
  const users = readUserData()
  const updatedUsers = users.filter((p) => p.id !== id)
  writeUserData(updatedUsers)
  return true
}

model.createUser = async (user) => {
  const users = readUserData()
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1
  const newUser = { id: newId, ...user }
  users.push(newUser)
  writeUserData(users)
  return newUser
}

model.updateUser = async (id, updatedData) => {
  const users = readUserData()
  const userIndex = users.findIndex((p) => p.id === id)

  if (userIndex === -1) {
    return null
  }

  const updatedUser = { ...users[userIndex], ...updatedData }
  users[userIndex] = updatedUser
  writeUserData(users)
  return updatedUser
}

module.exports = model
