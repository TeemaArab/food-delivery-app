import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';


// app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//database connection
connectDB();

// api endpoints
app.get('/', (req,res)=>{
    res.send('API  working');
})


//to run express server
app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})

