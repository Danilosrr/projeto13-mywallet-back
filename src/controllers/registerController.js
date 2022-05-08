import db from './../db.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function register (req, res) {
    const user = res.locals.body;

    try {
        const hashPassword = await bcrypt.hashSync(user.password, 10);
        await db.collection("users").insertOne({
            username: user.username,
            email: user.email,
            password: hashPassword
        });
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        res.sendStatus(424);
    };
};

export async function login (req, res) {
    const user = res.locals.body;
    const hasUser = await db.collection('users').findOne({ email: user.email });
    
    if (hasUser && bcrypt.compareSync(user.password, hasUser.password)) {
        const token = uuid();
        await db.collection('sessions').insertOne({ token, userId: hasUser._id });
        res.send({ token: token });
    } else {
        res.sendStatus(401);
    };
};