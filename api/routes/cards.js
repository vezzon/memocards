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

const router = express.Router();

router.use(authorization);

router.get('/:id', getOneCard);
router.get('/', getAllCards);
router.get('/users/:userId', getAllCardsByUser);
router.post('/', validateCreationRules, validateCardCreation, createCard);
router.delete('/:id', deleteCard);

module.exports = router;
