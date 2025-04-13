import express from 'express';
import { uploadResume, getResumes, downloadResume } from '../controllers/ResumeController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/upload', auth, upload.single('resume'), uploadResume);
router.get('/', auth, getResumes);
router.get('/download/:fileName', auth, downloadResume);

export default router;