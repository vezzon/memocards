const userService = require('../services/userService');

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (user) {
      res.status(400).json({
        message: 'Invalid credentials',
      });
    } else {
      await userService.createUser(email, password);
      res.status(201).json({
        message: `User ${email} signup successfuly`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Something went wrong!',
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  getAllUsers,
  getUserById,
};
