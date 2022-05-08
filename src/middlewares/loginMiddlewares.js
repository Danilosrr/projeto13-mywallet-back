import loginSchema from "./../schemas/loginSchema.js";

export function validateloginInputs(req, res, next) {
    const user = req.body;
    const validation = loginSchema.validate(user, { abortEarly: false });
  
    if (validation.error) {
        console.log("error during login input validation")
        return res.status(422).send(validation.error.details);
    }else{
        res.locals.body = user
        next();
    };
};    