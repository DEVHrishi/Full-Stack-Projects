import express from 'express';
const foodController = require('../controller/food.controller');


const foodRouter = express.Router();


foodRouter.get('/', foodController.all_food);
foodRouter.get('/search/:searchTerm', foodController.food_by_search)
foodRouter.get('/tags', foodController.food_by_tag);
foodRouter.get('/tag/:tagName', foodController.food_by_tagName);
foodRouter.get('/:foodId', foodController.food_by_id);



module.exports = foodRouter;