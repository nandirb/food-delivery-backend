import { model, models, Schema } from 'mongoose';

const FOOD_CATEGORY_SCHEMA = new Schema(
  {
    categoryName: String,
  },
  { timestamps: true }
);

const FoodCategoryModel =
  models['FoodCategory'] ||
  model('FoodCategory', FOOD_CATEGORY_SCHEMA, 'food-category');

export { FoodCategoryModel };
