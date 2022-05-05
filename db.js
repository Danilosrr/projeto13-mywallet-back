import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect(() => {
    db = mongoClient.db("mywallet-API");
    console.log("sucessfully connected to mongodb")
    });    
} catch (error) {
    console.log("error during connection to mongodb", error)
}

export default db;