const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cardsRouter);
app.use('/users', userRouter);
app.use((req, res) => {
  res.status('404');
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
