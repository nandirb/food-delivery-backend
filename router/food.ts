import { Request, Response, Router } from "express";
import { FoodModel } from "../models/food";
import { auth, CustomRequest, isAdmin } from "../middleware/auth";

export const foodRouter = Router();

foodRouter.get("/", async (req: CustomRequest, res: Response) => {
  const filter = req.query.category ? { category: req.query.category } : {};
  const items = await FoodModel.find(filter).populate("category");

  res.json(items);
});

foodRouter.post("/", auth, isAdmin, async (req: Request, res: Response) => {
  const newItem = await FoodModel.create({
    foodName: req.body.foodName,
    category: req.body.category,
    image: req.body.image,
  });

  res.json({
    message: "New Food created successfully.",
    newItem,
  });
});

foodRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await FoodModel.findById(id).populate("category");
  res.json(item);
});

foodRouter.put(":id", auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const updatedItem = await FoodModel.findByIdAndUpdate(
      req.params.id,
      {
        foodName: req.body.foodName,
      },
      { new: true },
    );
    res.json(updatedItem);
  } catch (e) {
    res.send(e);
  }
});

foodRouter.delete(
  "/:id",
  auth,
  isAdmin,
  async (req: Request, res: Response) => {
    const deletedItem = await FoodModel.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  },
);
