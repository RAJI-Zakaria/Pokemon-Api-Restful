const Joi = require('joi')

exports.verifyCreation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(5).messages({
      'string.empty': 'title is required',
      'string.min': 'title must have at least 5 characters',
    }),
    dateStart: Joi.string().required().messages({
      'string.empty': 'dateStart is required',
    }),
    dateEnd: Joi.string(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}

exports.verifyTermination = (req, res, next) => {
  const schema = Joi.object({
    dateEnd: Joi.string().required().messages({
      'string.empty': 'dateEnd is required',
    }),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}
