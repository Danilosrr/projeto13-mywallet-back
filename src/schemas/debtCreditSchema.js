import joi from "joi";

const debtCreditSchema = joi.object({
  description: joi.string().required(),
  value: joi.string().pattern(/(^[0-9]+,\d{1,2}$)|(^[0-9]+$)/).required(),
  type: joi.string().valid("credit", "debt").required()
});

export default debtCreditSchema;