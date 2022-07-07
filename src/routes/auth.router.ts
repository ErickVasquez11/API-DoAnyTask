const { Router } = require('express');
const { login, register, requestPassword, resetPassword } = require('../controllers/auth.controller');
const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/forgot', requestPassword);
authRouter.patch('/reset/:token', resetPassword);


module.exports = authRouter;