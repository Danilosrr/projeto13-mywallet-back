import express from 'express';
import { verifyToken } from './../middlewares/tokenMiddleware.js';
import { balance, newDebtCredit } from "./../controllers/balanceController.js";

const balanceRouter = express.Router();

balanceRouter.get('/balance',verifyToken,balance);
balanceRouter.post('/balance',verifyToken,newDebtCredit);

export default balanceRouter;