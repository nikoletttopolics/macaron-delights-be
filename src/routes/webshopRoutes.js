import WebshopController from '../controllers/webshopController.js';
import express from 'express';

const router = express.Router();

router.get('/webshop', WebshopController.getWebshopItems);

export default router;
