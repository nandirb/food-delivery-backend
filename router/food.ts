import { Request, Response, Router } from 'express';
import { FoodModel } from '../models/food';

export const foodRouter = Router();

foodRouter.get('/', async (req, res) => {
  const items = await FoodModel.find({}).populate('category');

  res.json(items);
});

foodRouter.post('/', async (req: Request, res: Response) => {
  const newItem = await FoodModel.create({
    foodName: req.body.foodName,
    category: req.body.category,
    image: req.body.image,
  });

  res.json({
    message: 'New Food created successfully.',
    newItem,
  });
});

foodRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await FoodModel.findById(id);
  res.json(item);
});

foodRouter.put(':id', async (req: Request, res: Response) => {
  const updatedItem = await FoodModel.findByIdAndUpdate(
    req.params.id,
    {
      foodName: req.body.foodName,
    },
    { new: true }
  );

  res.json(updatedItem);
});

foodRouter.delete('/:id', async (req: Request, res: Response) => {
  const deletedItem = await FoodModel.findByIdAndDelete(req.params.id);
  res.json(deletedItem);
});
