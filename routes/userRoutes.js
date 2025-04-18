import express from 'express';
import { createOrUpdateUserProfile, } from '../controllers/userController.js';
import verifyUser from '../middlewares/verifyUser.js'; 

const router = express.Router();

router.post('/profile', verifyUser, createOrUpdateUserProfile);

export default router;
