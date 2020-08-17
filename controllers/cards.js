const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards.length) {
        res.status(404).send({ message: 'Нет карточек' });
      }
      res.send({ data: cards });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные не валидны' });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => {
      res.status(404).send({ message: 'Такой карточки не существует' });
    })
    .then((card) => {
      card.remove();
      res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};