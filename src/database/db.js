import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { mockRecipes } from '../../mocks/recipes.mock.js';
import { mockWebshopItems } from '../../mocks/webshop.mock.js';

const initDB = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      recipeCardImgSrc TEXT,
      cardContent TEXT,
      backgroundColor TEXT,
      recipeDialogImgSrc TEXT
    )
  `);

  await db.exec(`
      CREATE TABLE IF NOT EXISTS webshop (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        imageSrc TEXT NOT NULL,
        quantity INTEGER,
        isInStock BOOLEAN DEFAULT 1,
        allergens TEXT,
        backgroundColor TEXT
      )
    `);

  const recipesRow = await db.get('SELECT COUNT(*) as count FROM recipes');

  if (recipesRow.count === 0) {
    for (const recipe of mockRecipes) {
      await db.run(
        `INSERT INTO recipes (name, ingredients, instructions, recipeCardImgSrc, cardContent, backgroundColor, recipeDialogImgSrc) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          recipe.name,
          JSON.stringify(recipe.ingredients),
          recipe.instructions,
          recipe.recipeCardImgSrc,
          recipe.cardContent,
          recipe.backgroundColor,
          recipe.recipeDialogImgSrc,
        ],
      );
    }
  }

  const webshopRow = await db.get('SELECT COUNT(*) as count FROM webshop');

  if (webshopRow.count === 0) {
    for (const webshopItem of mockWebshopItems) {
      await db.run(
        `INSERT INTO webshop (name, imageSrc, quantity, isInStock, allergens, backgroundColor) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          webshopItem.name,
          webshopItem.imageSrc,
          webshopItem.quantity,
          webshopItem.isInStock,
          JSON.stringify(webshopItem.allergens),
          webshopItem.backgroundColor,
        ],
      );
    }
  }

  return db;
};

export default initDB;
