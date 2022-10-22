const { verify } = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = { authorization };
