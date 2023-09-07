const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const userRules = require('../validators/userValidator')

// Define routes
router.get('/', controller.getAll)
router.get('/:id', controller.getByPk)
router.delete('/:id', controller.deleteByPk)
router.post('/', userRules.registration, controller.create)
router.put('/:id', controller.update)

//assign task to user
router.put('/:id/assign', userRules.assignOrRemoveTask, controller.assignTask)
router.put('/:id/remove', userRules.assignOrRemoveTask, controller.removeTask)

//get all tasks of the user
router.get('/:id/tasks', controller.getAllTasks)

module.exports = router
