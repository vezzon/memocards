const express = require('express');
const {
  getOneCard,
  getAllCards,
  getAllCardsByUser,
  createCard,
  deleteCard,
} = require('../controllers/cardsController');
const { authorization } = require('../middleware/authorization');
const {
  validateCreationRules,
  validateCardCreation,
} = require('../middleware/validation/card');
const { use } = require('../utils/asyncHandler');
const router = express.Router();

router.use(authorization);

router.get('/:id', use(getOneCard));
router.get('/', use(getAllCards));
router.get('/users/:userId', use(getAllCardsByUser));
router.post('/', validateCreationRules, validateCardCreation, use(createCard));
router.delete('/:id', use(deleteCard));

module.exports = router;
