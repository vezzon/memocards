const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUserById = async id => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async email => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ email: email, password: hash });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  getUserByEmail,
};
