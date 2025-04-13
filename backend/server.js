import express from 'express';
import cors from 'cors';
import AiRouter from './routes/AiRouter.js';
import AtsRouter from './routes/AtsRouter.js';
import AuthRouter from './routes/AuthRouter.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';
import ResumeRouter from './routes/ResumeRouter.js';

const mongoDBUrl = process.env.mongoDBUrl;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/ai', AiRouter);
app.use('/ats', AtsRouter);
app.use('/auth', AuthRouter);
app.use('/resume', ResumeRouter);

mongoose.connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`Server listening at Port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.get('/test-gemini', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const result = await model.generateContent("Hello");
        res.send(result.response.text());
    }
    catch (error) {
        res.status(500).send("Gemini API error: " + error.message);
    }
});