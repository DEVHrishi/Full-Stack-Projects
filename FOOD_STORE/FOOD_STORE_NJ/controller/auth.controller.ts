import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs'

async function find_user(req: any, res: any) {
    try {
        const { email, password } = req.body;
        // const user = sample_users.find(user => user.email === email && user.password === password);  
        const user = await UserModel.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token =  generateToken(user);
            res.status(200).json(token);
        } else {
            res.status(400).json("user name or password is not valid!");
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json('server error')
    }
}

const generateToken = (user: User) => {
    const token = jwt.sign({
        id: user.id, email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "4h"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

async function register(req: any, res: any) {
    try {
        const { name, email, password, address } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(400).json("User already exist! Please login")
            return
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false,
        }

        const dbUser = await UserModel.create(newUser);
        const user_token = generateToken(dbUser)
        res.json(user_token);
    }
    catch (error) {
        console.error(error)
        res.status(500).json('server error')
    }
}

module.exports = {
    find_user,
    register
}