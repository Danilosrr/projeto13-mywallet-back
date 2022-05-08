import express from 'express';

import { checkAvailability, validateRegisterInputs } from './../middlewares/registerMiddleware.js';
import { register, login } from "./../controllers/registerController.js";

import { validateloginInputs } from './../middlewares/loginMiddlewares.js';

const registerRouter = express.Router();

registerRouter.post('/register',validateRegisterInputs,checkAvailability,register);
registerRouter.post('/login',validateloginInputs,login);

export default registerRouter;
