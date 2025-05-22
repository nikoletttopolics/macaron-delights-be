import initDB from '../database/db.js';

class WebshopController {
  async getWebshopItems(req, res) {
    try {
      const db = await initDB();
      const webshopItems = await db.all('SELECT * FROM webshop');
      const modifiedWebshopItems = webshopItems.map((webshopItem) => ({
        ...webshopItem,
        isInStock: webshopItem.isInStock ? true : false,
      }));

      res.status(200).json(modifiedWebshopItems);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving webshop.', error });
    }
  }
}

export default new WebshopController();
