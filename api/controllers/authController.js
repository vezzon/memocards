const {
  generateAccessToken,
  generateRefreshToken,
} = require('../auth/tokenHandler');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const jwtData = { id: user.id, email: user.email };
      const refreshToken = generateRefreshToken(jwtData);

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        id: user.id,
        token: generateAccessToken(jwtData),
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong!' });
  }
};

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const jwtData = { id: user.id, email: user.email };

      try {
        const foundUser = userService.getUserByEmail(jwtData.email);
        if (!foundUser)
          return res.status(401).json({ message: 'Unauthorized' });

        const token = generateAccessToken(jwtData);
        res.status(200).json({ id: jwtData.id, token });
      } catch (error) {
        return res.sendStatus(500);
      }
    }
  );
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.json({ message: 'Cookie cleared' });
};

module.exports = {
  login,
  refresh,
  logout,
};
