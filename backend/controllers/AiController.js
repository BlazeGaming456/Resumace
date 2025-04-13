import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const suggest = async (req, res) => {
  try {
    const { type, text } = req.body;
    if (!type || !text) {
      return res.status(400).json({ error: "Missing type or text" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      generationConfig: {
        temperature: 0.2, // Lower for more deterministic output
      },
    });

    const prompt = `I'm making an AI resume website. The user can input their data in different fields like project description or work experience descriptions, etc. In this case, the user is specifying ${type}, and the text given by the user is ${text}. Improve it so that it will suit the resume. Rules - 1. Remove all other text except the description to be revised. 2. Make it more concise and clear.`;

    const result = await model.generateContent(prompt);
    res.status(200).json({
      suggestion: result.response
        .text()
        .replace(/'''.*?/g, "")
        .trim(),
    });
  } catch (error) {
    console.error("Error in suggesting:", error);
    res.status(500).json({ error: error.message });
  }
};

const analyzeWithGemini = async (textContent) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
        Analyze this resume and return JSON with:
        {
            "score": 0-100,
            "feedback": [
            {
                "message": "Specific feedback item",
                "isPositive": boolean
            }
            ]
        }

        Evaluate based on:
        1. Keyword matching (JavaScript, React, etc)
        2. Experience quality
        3. Education verification
        4. Contact information
        5. Length appropriateness

        Return only valid JSON. Resume text:
        ${textContent}
        `;

    const result = await model.generateContent(prompt);
    const jsonString = result.response.text();

    // Clean and parse the JSON response
    const cleanJson = jsonString.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error in analyzing with Gemini:", error);
    throw new Error("Failed to analyze resume with Gemini: " + error.message);
  }
};

const compareWithAi = async (req, res) => {
    try {
        const { text1, text2 } = req.body;
        
        if (!text1 || !text2) {
            return res.status(400).json({
                error: "Missing resume texts",
                details: "Please provide text content for both resumes"
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            generationConfig: {
                responseMimeType: "application/json",
                maxOutputTokens: 1000, // Reduced output size
                temperature: 0.3 // More deterministic output
            },
        });

        // Truncate text to first 2000 characters to reduce processing time
        const truncatedText1 = text1.substring(0, 4000);
        const truncatedText2 = text2.substring(0, 4000);

        const prompt = `
        Analyze both resumes and return JSON with:
        {
            "score1": 0-100,
            "score2": 0-100,
            "feedback": [
            {
                "message": "Specific feedback item"
            }
            ],
            "winner": "applicant1" or "applicant2"
        }

        Evaluate based on:
        1. Keyword matching (JavaScript, React, etc)
        2. Experience quality
        3. Education verification
        4. Contact information
        5. Length appropriateness

        Resume text of the 1st applicant:
        ${truncatedText1}

        Resume text of the 2nd applicant:
        ${truncatedText2}
        `;

        const result = await model.generateContent(prompt, { timeout: 25000 }); // 25s timeout
        const jsonString = result.response.text();
        const cleanJson = jsonString.replace(/```json|```/g, "").trim();
        const parsedResult = JSON.parse(cleanJson);

        res.status(200).json(parsedResult);
    }
    catch (error) {
        console.error("Error in comparing with AI:", error);
        res.status(500).json({
            error: "Failed to compare resumes",
            details: error.message
        });
    }
};

const generateCoverLetter = async (req,res) => {
    const {text, description} = req.body;

    if (!text || !description) {
        return res.status(400).json({
            error: "Missing text or description",
            details: "Please provide text content for the resumes and the description"
        });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
        generationConfig: {
            responseMimeType: "application/json",
            maxOutputTokens: 1000, // Reduced output size
            temperature: 0.3 // More deterministic output
        },
    });

    // Truncate text to first 2000 characters to reduce processing time
    const truncatedText1 = text.substring(0, 4000);

    const prompt = `
    Generate a cover letter based on the following resume text and job description:
    {
        "resume": "${truncatedText1}",
        "description": "${description}"
    }
    Format it properly.
    `;

    const result = await model.generateContent(prompt, { timeout: 25000 }); // 25s timeout
        const jsonString = result.response.text();
        const cleanJson = jsonString.replace(/```json|```/g, "").trim();
        const parsedResult = JSON.parse(cleanJson);

        res.status(200).json(parsedResult);
}

export { suggest, analyzeWithGemini, compareWithAi, generateCoverLetter };
