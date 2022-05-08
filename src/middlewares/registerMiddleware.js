import db from "./../db.js";
import registerSchema from "./../schemas/registerSchema.js";

export function validateRegisterInputs(req, res, next) {
    const user = req.body;
    const validation = registerSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        console.log("error during registry input validation")
        return res.status(422).send(validation.error.details);
    }else if (user.password != user.passwordConfirm) {
        return res.status(422).send("password and confirmation not matching");
    }else{
        res.locals.body = user
        next();
    };
};

export async function checkAvailability(req, res, next) {
    const user = res.locals.body;
    const alreadyUser = await db.collection("users").findOne({ email: user.email });

    if (alreadyUser) {
        return res.status(401).send("Email already registered");
    }else{
        next();
    }
};   



