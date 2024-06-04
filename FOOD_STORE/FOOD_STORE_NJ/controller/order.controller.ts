import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderStatus } from "../constants/order_status";
import { OrderModel } from "../models/order.model";


async function create_order(req:any, res: any) {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).json('Cart Is Empty!');
        return;
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({...requestOrder,user: req.user.id});
    await newOrder.save();
    res.json(newOrder);
}


async function newOrderForCurrentUser(req:any, res: any) {
    const order= await getNewOrderForCurrentUser(req);
    console.log(order)
    if(order) res.json(order);
    else res.status(HTTP_BAD_REQUEST).json('not successfull');
}

async function pay_order(req:any, res:any) {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_BAD_REQUEST).json('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}

async function track_order(req:any, res:any) {
    const order = await OrderModel.findById(req.params.id);
    res.json(order);
}

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}


module.exports = {
    create_order,
    newOrderForCurrentUser,
    pay_order,
    track_order
}