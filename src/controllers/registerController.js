import db from './../db.js';
import joi from 'joi';
import bcrypt from 'bcrypt';

export default async function register (req, res){
    const user = req.body;
    const registerSchema = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        passwordConfirm: joi.string().required()
    });

    const validation = registerSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error);
        res.sendStatus(422);
    }else{
        try {
            const hashPassword = await bcrypt.hashSync(user.password, 10);
            const usuariosDB = await db.collection("usuarios").insertOne({
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