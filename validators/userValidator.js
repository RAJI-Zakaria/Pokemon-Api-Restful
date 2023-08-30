const Joi = require('joi')

exports.registration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must have at least 2 characters',
    }),
    last_name: Joi.string().min(2),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must have at least 8 characters',
    }),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}

exports.assignOrRemoveTask = (req, res, next) => {
  const schema = Joi.object({
    taskId: Joi.number().required().messages({
      'string.empty': 'Task ID is required',
    }),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}
