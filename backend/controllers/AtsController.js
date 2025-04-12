import { promises as fs } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse-debugging-disabled');
import { analyzeWithGemini } from './AiController.js';

const pdfParse = async (req, res) => {
    const { file } = req;
    
    if (!file) {
        return res.status(400).json({ 
            error: "No file uploaded",
            details: "Please select a PDF file to upload"
        });
    }

    try {
        console.log("Reading file:", file.path);
        const dataBuffer = await fs.readFile(file.path);
        console.log("File read successfully");
        
        const pdfData = await pdf(dataBuffer);
        console.log("PDF parsed successfully");
        
        console.log("Analyzing text with Gemini...");
        const analysis = await analyzeWithGemini(pdfData.text);
        console.log("Analysis complete:", analysis);
        
        await fs.unlink(file.path).catch(console.error);
        
        res.status(200).json(analysis);
    }
    catch (error) {
        console.error("Error parsing PDF:", error);
        return res.status(500).json({ 
            error: "Error processing your resume",
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export default pdfParse;