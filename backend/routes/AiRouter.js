import express from "express";
import { suggest, analyzeWithGemini, compareWithAi, generateCoverLetter } from "../controllers/AiController.js";
import auth from "../middleware/auth.js";

const AiRouter = express.Router();

// Protect all AI routes
AiRouter.use(auth);

AiRouter.post("/suggest", suggest);
AiRouter.post("/analyze", analyzeWithGemini);
AiRouter.post("/compare", compareWithAi);
AiRouter.post("/cover-letter", generateCoverLetter);

export default AiRouter;