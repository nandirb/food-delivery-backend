import { Request, Response, Router } from "express";
import { FoodCategoryModel } from "../models/food-category";
import { auth, isAdmin } from "../middleware/auth";

export const foodCategoryRouter = Router();

foodCategoryRouter.get("/", async (req, res) => {
  const items = await FoodCategoryModel.find();
  res.json(items);
});

foodCategoryRouter.get("/:id", auth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await FoodCategoryModel.findById(id);
  res.json(item);
});

foodCategoryRouter.post(
  "/",
  auth,
  isAdmin,
  async (req: Request, res: Response) => {
    const newItem = await FoodCategoryModel.create({
      categoryName: req.body.categoryName,
    });

    res.json({
      message: "New Food Category created successfully.",
      newItem,
    });
  },
);

foodCategoryRouter.put(
  ":id",
  auth,
  isAdmin,
  async (req: Request, res: Response) => {
    const updatedItem = await FoodCategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        categoryName: req.body.categoryName,
      },
      { new: true },
    );

    res.json(updatedItem);
  },
);

foodCategoryRouter.delete(
  "/:id",
  auth,
  isAdmin,
  async (req: Request, res: Response) => {
    const deletedItem = await FoodCategoryModel.findByIdAndDelete(
      req.params.id,
    );
    res.json(deletedItem);
  },
);
