const express = require('express');
const { signup } = require('../controllers/usersController');
const {
  validateRules,
  validateUserSignup,
} = require('../middleware/validation/user');
const router = express.Router();
const { use } = require('../utils/asyncHandler');

// router.get('/', use(getAllUsers));
// router.get('/:id', use(getUserById));
router.post('/signup', validateRules, validateUserSignup, use(signup));

module.exports = router;
