import express from 'express';
import cors from "cors";
const foodRouter = require('./router/food.router');
const authRouter = require('./router/auth.router');
const orderRouter = require('./router/order.router');
const morgan = require('morgan')
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import { dbConnect } from './config/database.config';
dbConnect();

app.use(morgan('tiny'))
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use('/auth', authRouter);
app.use('/foods', foodRouter);
app.use("/orders", orderRouter);



const port = 5000;
app.listen(port, () => {
    console.log("server running on port "+ port)
})