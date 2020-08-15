const cardsRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const pathToCards = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/', (req, res) => {
  fs.readFile(pathToCards, 'utf-8')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
});

module.exports = cardsRouter;
