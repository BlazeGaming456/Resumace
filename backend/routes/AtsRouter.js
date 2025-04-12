import pdfParse from "../controllers/AtsController.js";
import express from "express";
import upload from "../middleware/multer.js";

const AtsRouter = express.Router();

AtsRouter.post("/parse", upload.single('file') , pdfParse);

export default AtsRouter;