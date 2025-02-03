"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodModel = void 0;
const mongoose_1 = require("mongoose");
const FOOD_SCHEMA = new mongoose_1.Schema({
    foodName: String,
    price: {
        type: Number,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'FoodCategory',
    },
    image: String,
}, { timestamps: true });
const FoodModel = mongoose_1.models['Foods'] || (0, mongoose_1.model)('Foods', FOOD_SCHEMA);
exports.FoodModel = FoodModel;
