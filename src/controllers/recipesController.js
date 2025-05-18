import { mockRecipes } from '../../mocks/recipes.mock.js';
import initDB from '../database/db.js';

class RecipesController {
  async getRecipes(req, res) {
    try {
      // const recipes = await mockRecipes;
      const db = await initDB();
      const recipes = await db.all('SELECT * FROM recipes');
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving recipes.', error });
    }
  }
}

export default new RecipesController();
