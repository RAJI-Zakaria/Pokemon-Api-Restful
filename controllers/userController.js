const model = require('../models/userModel')

const { validationResult } = require('express-validator')

// Define controller methods
const controller = {}

//get all users
controller.getAll = async (req, res) => {
  const users = await model.getAllUsers()
  res.json(users)
}

controller.getByPk = async (req, res) => {
  const id = parseInt(req.params.id)
  const user = await model.getUser(id)

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
}

controller.deleteByPk = async (req, res) => {
  const id = parseInt(req.params.id)
  const deleted = await model.deleteUser(id)

  if (!deleted) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json({ message: 'User deleted' })
}

controller.create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const newUser = req.body
  const createdUser = await model.createUser(newUser)

  res.status(201).json(createdUser)
}

controller.update = async (req, res) => {
  const id = parseInt(req.params.id)
  const updatedData = req.body
  const updatedUser = await model.updateUser(id, updatedData)

  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(updatedUser)
}

controller.getAllUsers = async (req, res) => {
  const users = await model.getAllUsers()

  res.json(users)
}

//functions : assignTask and removeTask
controller.assignTask = async (req, res) => {
  const id = parseInt(req.params.id)
  const taskId = parseInt(req.body.taskId)
  const updatedUser = await model.updateUserAssignTask(id, taskId)

  if (!updatedUser) {
    return res.status(404).json({
      error:
        'something went wrong : Maybe the task has been already set or task not found',
    })
  }

  res.json(updatedUser)
}
controller.removeTask = async (req, res) => {
  const id = parseInt(req.params.id)
  const taskId = parseInt(req.body.taskId)
  const updatedUser = await model.updateUserRemoveTask(id, taskId)
  console.log('user controller ', updatedUser)
  if (!updatedUser) {
    return res.status(404).json({
      error: 'something went wrong : Maybe the task has been already removed',
    })
  }

  res.json(updatedUser)
}

//get all user's tasks :
controller.getAllTasks = async (req, res) => {
  const id = parseInt(req.params.id)
  const tasks = await model.getAllTasks(id)
  console.log('tasks', tasks)
  if (!tasks) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.send(tasks)
}

module.exports = controller
