const { extractValidationRules } = require('../utility/customErrorWrapper/validationProxy');

const validateRequestWithSchema = (schema) => {
  const validationSchema = extractValidationRules(schema);

  return (req, res, next) => {
    const { error } = validationSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: 'Validation error', errors: errorMessages });
    }
    next();
  };
};

module.exports = validateRequestWithSchema;
