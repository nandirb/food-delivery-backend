import { Request, Response, Router } from 'express';
import { FoodModel } from '../models/food';
import { auth, CustomRequest } from '../middleware/auth';

export const foodRouter = Router();

foodRouter.get('/', auth, async (req: CustomRequest, res: Response) => {
  const items = await FoodModel.find({});

  res.json(items);
});

foodRouter.post('/', auth, async (req: Request, res: Response) => {
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

foodRouter.get('/:id', auth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await FoodModel.findById(id);
  res.json(item);
});

foodRouter.put(':id', auth, async (req: Request, res: Response) => {
  const updatedItem = await FoodModel.findByIdAndUpdate(
    req.params.id,
    {
      foodName: req.body.foodName,
    },
    { new: true }
  );

  res.json(updatedItem);
});

foodRouter.delete('/:id', auth, async (req: Request, res: Response) => {
  const deletedItem = await FoodModel.findByIdAndDelete(req.params.id);
  res.json(deletedItem);
});
