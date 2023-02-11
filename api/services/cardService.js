const Card = require('../models/Card');
const ObjectId = require('mongoose').Types.ObjectId;

const getCardById = async _id => {
  try {
    const card = await Card.findOne({ _id });
    return card;
  } catch (error) {
    console.log(error);
  }
};

const getAllCards = async () => {
  try {
    const cards = await Card.find();
    return cards;
  } catch (error) {
    console.log(error);
  }
};

const getAllCardsByUser = async userId => {
  try {
    const query = { userId: ObjectId(userId) };
    const cards = await Card.find(query).exec();
    return cards;
  } catch (error) {
    console.log(error);
  }
};

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};

const getAllUserCardsForLearning = async userId => {
  try {
    const today = new Date().toISOString();

    const userCards = await getAllCardsByUser(userId);

    const cards = userCards.filter(c => {
      if (c.passed === 0) return c;

      const dateForRepetitionAfterPass = addDays(c.updatedAt, c.passed);

      if (dateForRepetitionAfterPass <= today) return c;
    });

    return cards;
  } catch (error) {
    console.log(error);
  }
};

const createCard = async (front, back, userId) => {
  try {
    await Card.create({ front, back, userId });
  } catch (error) {
    console.log(error);
  }
};

const updateCard = async (_id, card) => {
  try {
    // const card = await Card.findOne({ _id });
    await Card.updateOne({ _id }, { ...card });
  } catch (error) {
    console.log(error);
  }
};

const deleteCard = async id => {
  try {
    await Card.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCardById,
  getAllCards,
  getAllCardsByUser,
  getAllUserCardsForLearning,
  createCard,
  updateCard,
  deleteCard,
};
