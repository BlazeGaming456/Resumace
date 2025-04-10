import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config'

const suggest = async (req,res) => {
    try {
        const {type,text} = req.body;
        if (!type || !text) {
            return res.status(400).json({error:"Missing type or text"})
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({model: "gemini-1.5-pro-latest",
            generationConfig: {
                temperature:0.2, //Lower for more deterministic output
        }});
        
        const prompt = `I'm make an AI resume website. The user can input their data in different fields like project description or work experience descriptions, etc.
        In this case, the user is specifying ${type}, and the text given by the user is ${text}. Improve it so that it will suit the resume.
        Rules -
        1. Remove all other text except the description to be revised.
        2. Make it more concise and clear.`

        const result = await model.generateContent(prompt);
        res.status(200).json({suggestion: result.response.text().replace(/'''.*?/g, '').trim()});
    }
    catch (error) {
        console.error("Error in suggesting:", error);
        res.status(500).json({ error: error });
    }
}

export { suggest };