import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import registerRouter from "./routes/registerRouter.js"

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.use(registerRouter);

app.listen(5000,()=>console.log("server connected on port 5000"));