import { model, models, Schema } from 'mongoose';

const FOOD_SCHEMA = new Schema(
  {
    foodName: String,
    price: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'FoodCategory',
    },
    image: String,
  },
  { timestamps: true }
);

const FoodModel = models['Foods'] || model('Foods', FOOD_SCHEMA);

export { FoodModel };
