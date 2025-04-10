import { suggest } from "../controllers/AiController.js";
import express from "express";

const AiRouter = express.Router();

AiRouter.post("/suggest", suggest);

export default AiRouter;