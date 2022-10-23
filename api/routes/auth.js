const express = require('express');
const { login, logout, refresh } = require('../controllers/authController');
const { use } = require('../utils/asyncHandler');

const router = express.Router();

router.post('/login', use(login));
router.post('/logout', logout);
router.get('/refresh', use(refresh));

module.exports = router;
