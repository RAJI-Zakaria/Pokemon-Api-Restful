const model = require('../models/UserModel')

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

module.exports = controller
