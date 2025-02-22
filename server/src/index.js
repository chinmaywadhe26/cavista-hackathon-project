import 'dotenv/config'
import express, { Router } from 'express';
import connectDb from './db/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app=express();
const port=process.env.PORT ;
app.use(cors({
    "origin": "http://localhost:3000",
    //"allowedOrigins":'['*']',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true      
  }));
app.use(cookieParser());
app.use(express.json());        
connectDb();



app.listen(port, ()=>{
    console.log(`Server is listening on port http://localhost:${port}`);
})

