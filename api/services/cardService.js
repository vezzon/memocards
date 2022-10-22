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

const createCard = async (front, back, userId) => {
  try {
    await Card.create({ front, back, userId });
  } catch (error) {
    console.log(error);
  }
};

const deleteCard = async id => {
  try {
    await Card.findOneAndDelete({ id });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCardById,
  getAllCards,
  getAllCardsByUser,
  createCard,
  deleteCard,
};
