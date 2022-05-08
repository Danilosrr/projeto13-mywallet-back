import debtCreditSchema from "./../schemas/debtCreditSchema.js";

export function validateNewDebtCredit(req, res, next) {
    const newOperation = req.body
    const validation = debtCreditSchema.validate(newOperation, { abortEarly: false });
    
    if (validation.error) {
        console.log("error during entry validation")
        return res.status(422).send(validation.error.details);
    }else{
        next();
    };
};