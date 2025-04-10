import express from 'express';
import cors from 'cors';
import AiRouter from './routes/AiRouter.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/Ai', AiRouter);

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})