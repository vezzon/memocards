const { body, validationResult } = require('express-validator');

const validateRules = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 15, max: 60 })
    .withMessage('Password needs to be at least 15 characters'),
];

const validateUserSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUserSignup, validateRules };
