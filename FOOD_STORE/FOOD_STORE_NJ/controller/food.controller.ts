import {sample_foods, sample_tags} from '../data'
import { FoodModel } from '../models/food.model';



async function all_food(req: any, res: any) {
    try{
        const foods = await FoodModel.find();
        res.status(200).json(foods);
    }
    catch(error){
        console.error(error)
        res.status(500).json('server error')
    }
}

async function food_by_search(req: any, res: any) {
    try{
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({name: {$regex:searchRegex}});
        res.status(200).json(foods)
        // const searchTerm = req.params.searchTerm;
        // const foods = sample_foods
        // .filter(food => food.name.toLowerCase()
        // .includes(searchTerm.toLowerCase()));
        // res.status(200).json(foods);
    }
    catch(error){
        console.error(error)
        res.status(500).json('server error')
    }
}

async function food_by_tag(req: any, res: any) {
    try{
        const tags = await FoodModel.aggregate([
            {
                $unwind:'$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);
        res.status(200).json(tags);
    }
    catch(error){
        console.error(error)
        res.status(500).json('server error')
    }
}

async function food_by_tagName(req: any, res: any) {
    try{

        // const tagName = req.params.tagName;
        // const foods = sample_foods
        // .filter(food => food.tags?.includes(tagName));
        const foods = await FoodModel.find({tags: req.params.tagName})
        res.status(200).json(foods);
    }
    catch(error){
        console.error(error)
        res.status(500).json('server error')
    }
}

async function food_by_id(req: any, res: any) {
    try{
        // const foodId = req.params.foodId;
        // const foods = sample_foods
        // .find(food => food.id == foodId);
        const foods = await FoodModel.findById(req.params.foodId)
        res.status(200).json(foods);
    }
    catch(error){
        console.error(error)
        res.status(500).json('server error')
    }
}



module.exports = {
    all_food,
    food_by_search,
    food_by_tag,
    food_by_tagName,
    food_by_id,
}
    
