import express from 'express';
import auth from '../middleware/auth.middleware';

const orderController = require('../controller/order.controller');
const orderRouter = express.Router();
orderRouter.use(auth)



orderRouter.post('/create', orderController.create_order);
orderRouter.get('/newOrderForCurrentUser', orderController.newOrderForCurrentUser);
orderRouter.post('/pay', orderController.pay_order);
orderRouter.get('/track/:id', orderController.track_order);




module.exports = orderRouter;