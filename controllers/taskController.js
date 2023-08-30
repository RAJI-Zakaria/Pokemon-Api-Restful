const model = require('../models/taskModel')

const { validationResult } = require('express-validator')

// Define controller methods
const controller = {}

//get all tasks
controller.getAll = async (req, res) => {
  const tasks = await model.getAllTasks()
  res.json(tasks)
}

controller.getByPk = async (req, res) => {
  const id = parseInt(req.params.id)
  const task = await model.getTask(id)

  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }

  res.json(task)
}

controller.deleteByPk = async (req, res) => {
  const id = parseInt(req.params.id)
  const deleted = await model.deleteTask(id)

  if (!deleted) {
    return res.status(404).json({ error: 'Task not found' })
  }

  res.json({ message: 'Task deleted' })
}

controller.create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const newTask = req.body
  const createdTask = await model.createTask(newTask)

  res.status(201).json(createdTask)
}

controller.update = async (req, res) => {
  const id = parseInt(req.params.id)
  const updatedData = req.body
  const updatedTask = await model.updateTask(id, updatedData)

  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' })
  }

  res.json(updatedTask)
}

controller.getAllTasks = async (req, res) => {
  const tasks = await model.getAllTasks()

  res.json(tasks)
}

module.exports = controller
