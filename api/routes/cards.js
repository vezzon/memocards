const express = require('express');
const {
  getOneCard,
  getAllCards,
  getAllCardsByUser,
  getAllUserCardsForLearning,
  createCard,
  updateCard,
  deleteCard,
} = require('../controllers/cardsController');
const { authorization } = require('../middleware/authorization');
const {
  validateCreationRules,
  validateCardCreation,
  validateCardUpdate,
  validateUpdateRules,
} = require('../middleware/validation/card');
const { use } = require('../utils/asyncHandler');
const router = express.Router();

router.use(authorization);

router.get('/:id', use(getOneCard));
router.get('/', use(getAllCards));
router.get('/users/:userId', use(getAllCardsByUser));
router.get('/users/learning/:userId', use(getAllUserCardsForLearning));
router.post('/', validateCreationRules, validateCardCreation, use(createCard));
router.put('/:id', validateUpdateRules, validateCardUpdate, use(updateCard));
router.delete('/:id', use(deleteCard));

module.exports = router;
