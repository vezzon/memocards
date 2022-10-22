const cardsService = require('../services/cardService');

const getOneCard = async (req, res) => {
  try {
    const card = await cardsService.getCardById(req.params.id);
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await cardsService.getAllCards();
    res.json(cards);
  } catch (error) {
    console.log(error);
  }
};

const getAllCardsByUser = async (req, res) => {
  try {
    const cards = await cardsService.getAllCardsByUser(req.params.userId);
    res.json(cards);
  } catch (error) {
    console.log(error);
  }
};

const createCard = async (req, res) => {
  try {
    await cardsService.createCard(
      req.body.front,
      req.body.back,
      req.body.userId
    );
    res.status(201).send(req.body);
  } catch (error) {
    console.log(error);
  }
};

const deleteCard = async (req, res) => {
  try {
    const id = req.params.id;
    const card = await cardsService.getCardById(id);
    if (card) {
      await cardsService.deleteCard(id);
      res.status(204).json({ message: 'Card deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOneCard,
  getAllCards,
  getAllCardsByUser,
  createCard,
  deleteCard,
};
