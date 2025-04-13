import User from '../models/User.js';
import { promises as fs } from 'fs';
import path from 'path';

const uploadResume = async (req, res) => {
    try {
        const { file } = req;
        const userId = req.userId;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Move file to permanent storage
        const uploadDir = path.join(process.cwd(), 'uploads', userId);
        await fs.mkdir(uploadDir, { recursive: true });
        const newPath = path.join(uploadDir, file.originalname);
        await fs.rename(file.path, newPath);

        // Save resume info to user
        user.resumes.push({
            fileName: file.originalname,
            filePath: newPath
        });
        await user.save();

        res.status(201).json({ message: 'Resume uploaded successfully' });
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ error: 'Failed to upload resume' });
    }
};

const getResumes = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('resumes');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.resumes);
    } catch (error) {
        console.error('Error getting resumes:', error);
        res.status(500).json({ error: 'Failed to get resumes' });
    }
};

const downloadResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { fileName } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resume = user.resumes.find(r => r.fileName === fileName);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        res.download(resume.filePath, resume.fileName);
    } catch (error) {
        console.error('Error downloading resume:', error);
        res.status(500).json({ error: 'Failed to download resume' });
    }
};

export { uploadResume, getResumes, downloadResume };