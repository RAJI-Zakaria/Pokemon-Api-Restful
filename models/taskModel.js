const fs = require('fs')
const path = require('path')

// Load data from JSON files
const taskDataPath = path.join(__dirname, '../data/tasks.json')

// Helper function to read task data
function readTaskData() {
  return JSON.parse(fs.readFileSync(taskDataPath, 'utf8'))
}

// Helper function to write task data
function writeTaskData(data) {
  fs.writeFileSync(taskDataPath, JSON.stringify(data, null, 2), 'utf8')
}

const model = {}

model.getAllTasks = async () => {
  const tasks = readTaskData()
  return tasks
}

model.getTask = async (id) => {
  const tasks = readTaskData()
  const task = tasks.find((p) => p.id === id)
  return task || null
}

model.deleteTask = async (id) => {
  const tasks = readTaskData()
  const updatedTasks = tasks.filter((p) => p.id !== id)
  writeTaskData(updatedTasks)
  return true
}

model.createTask = async (task) => {
  const tasks = readTaskData()
  const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
  const newTask = { id: newId, ...task }
  tasks.push(newTask)
  writeTaskData(tasks)
  return newTask
}

model.updateTask = async (id, updatedData) => {
  const tasks = readTaskData()
  const taskIndex = tasks.findIndex((p) => p.id === id)

  if (taskIndex === -1) {
    return null
  }

  const updatedTask = { ...tasks[taskIndex], ...updatedData }
  tasks[taskIndex] = updatedTask
  writeTaskData(tasks)
  return updatedTask
}

module.exports = model
