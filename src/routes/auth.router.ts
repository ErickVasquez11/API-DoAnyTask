const { Router } = require('express');
const { register } = require('ts-node');
const { login } = require('../controllers/auth.controller');
const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);

module.exports = authRouter;