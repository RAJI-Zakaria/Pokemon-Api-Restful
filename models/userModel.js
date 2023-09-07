const fs = require('fs')
const path = require('path')

// Load data from JSON files
const userDataPath = path.join(__dirname, '../data/users.json')

//while assigning new tasks to user we must verify iof the task exists in the tasks.json file otherwise the user must create new tasks first
const tasks = require('../data/tasks.json')

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------
// Helper function to read user data
function readUserData() {
  return JSON.parse(fs.readFileSync(userDataPath, 'utf8'))
}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

// Helper function to write user data
function writeUserData(data) {
  fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), 'utf8')
}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------
const model = {}

model.getAllUsers = async () => {
  const users = readUserData()
  return users
}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

model.getUser = async (id) => {
  const users = readUserData()
  const user = users.find((p) => p.id === id)
  return user || null
}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

model.deleteUser = async (id) => {
  const users = readUserData()
  const updatedUsers = users.filter((p) => p.id !== id)
  writeUserData(updatedUsers)
  return true
}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

model.createUser = async (user) => {
  const users = readUserData()
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1
  const newUser = { id: newId, ...user }
  users.push(newUser)
  writeUserData(users)
  return newUser
}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

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

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

model.updateUserAssignTask = async (id, taskId) => {
  const users = readUserData()
  const userIndex = users.findIndex((p) => p.id === id)

  if (userIndex === -1) {
    return null
  }
  //if the tasks array is undefined then init
  if (!users[userIndex].tasks) {
    users[userIndex].tasks = []
  }

  //before push check if the value alreadyexists
  if (users[userIndex].tasks.includes(taskId)) {
    return null
  }

  //verify if the task exists in the tasks.json file
  const taskIndex = tasks.findIndex((p) => p.id === taskId)
  if (taskIndex === -1) {
    return null
  }

  //add id to the user's tasks
  users[userIndex].tasks.push(taskId)

  const updatedUser = { ...users[userIndex] }
  users[userIndex] = updatedUser
  writeUserData(users)
  return updatedUser
}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

model.updateUserRemoveTask = async (id, taskId) => {
  const users = readUserData()
  const userIndex = users.findIndex((p) => p.id === id)

  if (userIndex === -1) {
    return null
  }

  //get the index of the task then remove it
  const taskIndex = users[userIndex].tasks.indexOf(taskId)
  if (taskIndex === -1) {
    return null
  }
  //remove the element from the array and update the data
  users[userIndex].tasks.splice(taskIndex, 1)

  const updatedUser = { ...users[userIndex] }
  users[userIndex] = updatedUser
  writeUserData(users)
  return updatedUser
}

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

model.getAllTasks = async (id) => {
  const users = readUserData()
  const userIndex = users.findIndex((p) => p.id === id)
  if (userIndex === -1) {
    return null
  }
  //if the tasks array is undefined then init
  if (!users[userIndex].tasks) {
    users[userIndex].tasks = []
  }
  //get the tasks
  const tasksIds = users[userIndex].tasks
  //read all tasks title from tasks.json
  const tasksTitle = []
  tasksIds.forEach((taskId) => {
    //tasks is loaded from tasks.json
    const taskIndex = tasks.findIndex((p) => p.id === taskId)
    console.log(tasks)
    tasksTitle.push(tasks[taskIndex].title)
  })

  // const userTasks = {
  //   ...users[userIndex],
  //   tasks: tasksTitle,
  // }
  return tasksTitle
}

module.exports = model
