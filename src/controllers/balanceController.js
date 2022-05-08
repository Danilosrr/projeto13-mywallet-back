import db from './../db.js';

export async function balance (req, res) {
    try {
        const { user } = res.locals;
        const userBalance = await db.collection("transactions").find({ userId: user._id }).toArray();
        const sendBalance = userBalance.map((userData) => {
          delete userData.userId;
          return userData;
        });
        res.status(200).send(sendBalance);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }  
};

export async function newDebtCredit (req, res) {
    const { user } = res.locals;
    const { description, value, type } = req.body;
    
    const newTransaction = {
        userId: user._id,
        description,
        type,
        value
    };
    
    try {
        const userBalance = await db.collection("transactions").insertOne( newTransaction );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };  
};