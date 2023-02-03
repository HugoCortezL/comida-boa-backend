import express from 'express';
import bodyParser from "body-parser";
import { userRouter } from './routes/user';
import { materialRouter } from './routes/material';
import { portionRouter } from './routes/portion';


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/v1", userRouter)
app.use("/api/v1", materialRouter)
app.use("/api/v1", portionRouter)


export default app