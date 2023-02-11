const cardsService = require('../services/cardService');

const getOneCard = async (req, res) => {
  const card = await cardsService.getCardById(req.params.id);
  if (card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
};

const getAllCards = async (req, res) => {
  const cards = await cardsService.getAllCards();
  res.json(cards);
};

const getAllCardsByUser = async (req, res) => {
  const cards = await cardsService.getAllCardsByUser(req.params.userId);
  res.json(cards);
};

const getAllUserCardsForLearning = async (req, res) => {
  const cards = await cardsService.getAllUserCardsForLearning(
    req.params.userId
  );
  res.json(cards);
};

const createCard = async (req, res) => {
  await cardsService.createCard(req.body.front, req.body.back, req.body.userId);
  res.status(201).send(req.body);
};

const updateCard = async (req, res) => {
  console.log(req.body);
  const cardId = req.params.id;
  const card = req.body;
  await cardsService.updateCard(cardId, card);
  // await cardsService.updateCard(req.params.id, req.body.front, req.body.back);
  res.status(201).send(req.body);
};

const deleteCard = async (req, res) => {
  const id = req.params.id;
  const card = await cardsService.getCardById(id);
  if (!card) {
    return res.status(404).json({ message: 'Not found' });
  }
  await cardsService.deleteCard(id);
  res.status(204).json({ message: 'Card deleted' });
};

module.exports = {
  getOneCard,
  getAllCards,
  getAllCardsByUser,
  getAllUserCardsForLearning,
  createCard,
  updateCard,
  deleteCard,
};
