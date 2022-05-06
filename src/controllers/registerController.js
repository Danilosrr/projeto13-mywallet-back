import db from './../db.js';
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function register (req, res) {
    const user = req.body;
    const registerSchema = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        passwordConfirm: joi.string().required()
    });

    const validation = registerSchema.validate(user, { abortEarly: false });

    if (validation.error || user.password != user.passwordConfirm) {
        console.log(validation.error);
        res.sendStatus(422);
    }else{
        try {
            const hashPassword = await bcrypt.hashSync(user.password, 10);
            const usuariosDB = await db.collection("users").insertOne({
                username: user.username,
                email: user.email,
                password: hashPassword
            });
            res.sendStatus(201);
        } catch (error) {
            res.sendStatus(424);
            console.log(db,error);
        };
    };
};

export async function login (req, res) {
    const user = req.body;

    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
  
    const validation = loginSchema.validate(user, { abortEarly: false });

    const hasUser = await db.collection('users').findOne({ email: user.email });
    
    if (validation.error) {
        console.log(validation.error);
        res.sendStatus(422);
    } else if (hasUser && bcrypt.compareSync(user.password, hasUser.password)) {
        const token = uuid();
        await db.collection('sessions').insertOne({ token, userId: hasUser._id });
        res.send(token);
    } else {
        res.sendStatus(401);
    }
}