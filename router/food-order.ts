import { Request, Response, Router } from 'express';
import { FoodOrderModel } from '../models/food-order';
import { auth, CustomRequest } from '../middleware/auth';

export const foodOrderRouter = Router();

foodOrderRouter.get('/', auth, async (req: CustomRequest, res: Response) => {
  res.send('HELLOO');
});
foodOrderRouter.post('/', auth, async (req: CustomRequest, res: Response) => {
  /// CREATE ORDER

  const user = req?.userId;
  const { foodOrderItems, totalPrice } = req.body;

  const order = { user, foodOrderItems, totalPrice };

  const newOrder = await FoodOrderModel.create(order);
  res.json(newOrder);
});
