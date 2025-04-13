import { pdfParse, pdfText } from "../controllers/AtsController.js";
import express from "express";
import upload from "../middleware/multer.js";

const AtsRouter = express.Router();

AtsRouter.post("/parse", upload.single('file') , pdfParse);
AtsRouter.post("/text", upload.single('file') , pdfText);

export default AtsRouter;