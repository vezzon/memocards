const { body, validationResult } = require('express-validator');

const validateCreationRules = [
  body('front').notEmpty().withMessage(`Front side canno't be empty`),
  body('back')
    .notEmpty()
    // .isLength({ max: 60 })
    .withMessage(`Back side canno't be empty`),
];

const validateCardCreation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateCardCreation, validateCreationRules };
