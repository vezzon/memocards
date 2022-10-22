const express = require('express');
const { signup } = require('../controllers/usersController');
const {
  validateRules,
  validateUserSignup,
} = require('../middleware/validation/user');
const router = express.Router();

// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
router.post('/signup', validateRules, validateUserSignup, signup);

module.exports = router;
