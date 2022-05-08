import debtCreditSchema from "./../schemas/debtCreditSchema.js";

export default function validateNewDebtCredit(req, res, next) {
    const validation = debtCreditSchema.validate(req.body, { abortEarly: false });
    
    if (validation.error) {
        console.log("error during entry validation")
        return res.status(422).send(validation.error.details);
    }else{
        next();
    };
};