const express = require('express')
const router = express.Router()
const controller = require('../controllers/taskController')
const taskRules = require('../validators/taskValidator')

// Define routes
router.get('/', controller.getAll)
router.get('/:id', controller.getByPk)
router.delete('/:id', controller.deleteByPk)
router.post('/', taskRules.verifyCreation, controller.create)
router.put('/:id', controller.update) // update the dateEnd
router.put('/:id/terminate', taskRules.verifyTermination, controller.update) // update the dateEnd

module.exports = router
