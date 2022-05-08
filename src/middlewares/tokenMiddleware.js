import db from './../db.js';

export async function verifyToken (req, res, next) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '').trim();
    const session = await db.collection('sessions').findOne({ token: token });
    const user = await db.collection('users').findOne({ _id: session.userId });
    
    delete user.password;

    if (!token) {
        return res.send('missing authorization').status(422);
    }else{
        try {
            if (!session) {
                return res.send('session error').status(401);
            };
            if (!user) {
                return res.send('user error').status(401);
            };
        } catch (error) {
            return res.send(error).status(500);  
        };    
    };

    res.locals.user = user;
    console.log(user);
    next();
};