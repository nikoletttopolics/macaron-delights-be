import RecipesController from '../controllers/recipesController.js';
import express from 'express';

const router = express.Router();

router.get('/recipes', RecipesController.getRecipes);

export default router;
