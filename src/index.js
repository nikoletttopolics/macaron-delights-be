import express from 'express';
import cors from 'cors';
import recipesRoutes from './routes/recipesRoutes.js';
import webshopRoutes from './routes/webshopRoutes.js';
import appInitRoutes from './routes/appInitRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', recipesRoutes);
app.use('/', webshopRoutes);
app.use('/', appInitRoutes);

app.get('/', (_, res) => {
  res.send('Welcome to Macaron Delights backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
