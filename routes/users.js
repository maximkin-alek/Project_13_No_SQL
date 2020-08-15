const userRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const pathToCards = path.join(__dirname, '../data/user.json');

userRouter.get('/', (req, res) => {
  fs.readFile(pathToCards, 'utf-8')
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ Error: 'Ошибка сервера' });
    });
});

userRouter.get('/:id', (req, res) => {
  fs.readFile(pathToCards, 'utf-8')
    .then((users) => {
      const userObj = JSON.parse(users).find((user) => user._id === req.params.id);
      if (!userObj) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(userObj);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
});

module.exports = userRouter;
