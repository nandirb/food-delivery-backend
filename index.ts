import { configDotenv } from 'dotenv';
import express from 'express';
const mongoose = require('mongoose');
const cors = require('cors');
import { foodCategoryRouter } from './router/food-category';
import { foodRouter } from './router/food';

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

configDotenv();

const connectMongoDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.log('MONGODB_URI is not defined');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MONGODB CONNECTED');
  } catch (e) {
    console.error(e);
  }
};

connectMongoDB();

app.use('/food-category', foodCategoryRouter);
app.use('/food', foodRouter);

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
