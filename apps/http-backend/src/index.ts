import express, { Router } from "express";
import { authRouter } from "./auth.js";
const app = express();

app.use("/auth", authRouter);

app.listen(5000);