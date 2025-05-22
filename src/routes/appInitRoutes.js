import AppInitController from '../controllers/appInitController.js';
import express from 'express';

const router = express.Router();

router.get('/appInit', AppInitController.appInit);

export default router;
