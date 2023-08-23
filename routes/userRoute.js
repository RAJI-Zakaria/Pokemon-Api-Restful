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

module.exports = router
