const userService = require('../services/userService');

const signup = async (req, res) => {
  const { email, password } = req.body;

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
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

module.exports = {
  signup,
  getAllUsers,
  getUserById,
};
