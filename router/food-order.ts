import { Request, Response, Router } from "express";
import { FoodOrderModel } from "../models/food-order";
import { auth, CustomRequest, isAdmin } from "../middleware/auth";

export const foodOrderRouter = Router();

//ADMIN
foodOrderRouter.get(
  "/",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    try {
      const allOrders = await FoodOrderModel.find({});

      res.json(allOrders);
    } catch (e) {
      res.send(e);
    }
  },
);

//ADMIN
foodOrderRouter.put(
  "/:orderId",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    try {
      const { status } = req.body;
      const allOrders = await FoodOrderModel.findByIdAndUpdate(
        req.params.orderId,
        {
          status,
        },
      );

      res.json(allOrders);
    } catch (e) {
      res.send(e);
    }
  },
);

//USER _> His orders
foodOrderRouter.get(
  "/my-order",
  auth,
  async (req: CustomRequest, res: Response) => {
    try {
      const user = req?.userId;
      const myOrders = await FoodOrderModel.find({
        user: user,
      });

      res.json(myOrders);
    } catch (e) {
      res.send(e);
    }
  },
);

foodOrderRouter.post("/", auth, async (req: CustomRequest, res: Response) => {
  const user = req?.userId;
  const { foodOrderItems, totalPrice, address } = req.body;

  const order = { user, foodOrderItems, totalPrice, address };

  const newOrder = await FoodOrderModel.create(order);
  res.json(newOrder);
});
