const userRouter = require('express').Router();

const { getUsers, getUser, addUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', addUser);

module.exports = userRouter;
