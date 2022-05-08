import express from 'express';

import { balance, newDebtCredit } from "./../controllers/balanceController.js";
import { verifyToken } from './../middlewares/tokenMiddleware.js';

import { validateNewDebtCredit } from '../middlewares/newDebtCreditMiddleware.js';

const balanceRouter = express.Router();

balanceRouter.get('/balance',verifyToken,balance);
balanceRouter.post('/balance',verifyToken,validateNewDebtCredit,newDebtCredit);

export default balanceRouter;