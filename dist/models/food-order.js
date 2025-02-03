"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodOrderModel = void 0;
const mongoose_1 = require("mongoose");
const FoodOrderItemSchema = new mongoose_1.Schema({
    food: String,
    quantity: Number,
});
const FOOD_ORDER_SCHEMA = new mongoose_1.Schema({
    user: String,
    totalPrice: Number,
    foodOrderItems: [FoodOrderItemSchema],
    status: {
        type: String,
        enum: ['PENDING', 'CANCELED', 'DELIVERED'],
        default: 'PENDING',
    },
    address: String,
}, { timestamps: true });
const FoodOrderModel = mongoose_1.models['FoodOrder'] || (0, mongoose_1.model)('FoodOrder', FOOD_ORDER_SCHEMA);
exports.FoodOrderModel = FoodOrderModel;
