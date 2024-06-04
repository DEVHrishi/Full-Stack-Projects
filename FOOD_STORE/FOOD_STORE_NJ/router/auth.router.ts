import express from 'express';
const authRouter = express.Router();
const authController = require('../controller/auth.controller')



authRouter.post('/login', authController.find_user);
authRouter.post('/register', authController.register);


module.exports = authRouter;

