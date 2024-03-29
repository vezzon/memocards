require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const corsOptions = require('./configs/corsOptions');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./configs/database');

connectDB();

const dir = path.join(__dirname, 'logs');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logStream = fs.createWriteStream(path.join(dir, 'req.log'), {
  flags: 'a',
});

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors(corsOptions));
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: logStream }));
}
app.use(cookieParser());
app.use(express.json());

app.use('/api/cards', cardsRouter);
app.use('/api/users', usersRouter);
app.use('/api', authRouter);

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
