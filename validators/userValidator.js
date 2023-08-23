// validationRules.js
const { body } = require('express-validator')

exports.registration = [
  //add name reequired string
  body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2 })
    .withMessage(' > 2 chars'),
  body('last_name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 8 }),
]
