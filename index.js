import express, { json } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import cors from "cors"

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.listen(5000,()=>console.log("server connected on port 5000"));