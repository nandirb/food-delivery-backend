"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodOrderRouter = void 0;
const express_1 = require("express");
const food_order_1 = require("../models/food-order");
const auth_1 = require("../middleware/auth");
exports.foodOrderRouter = (0, express_1.Router)();
//ADMIN
exports.foodOrderRouter.get("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield food_order_1.FoodOrderModel.find({});
        res.json(allOrders);
    }
    catch (e) {
        res.send(e);
    }
}));
//ADMIN
exports.foodOrderRouter.put("/:orderId", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const allOrders = yield food_order_1.FoodOrderModel.findByIdAndUpdate(req.params.orderId, {
            status,
        });
        res.json(allOrders);
    }
    catch (e) {
        res.send(e);
    }
}));
//USER _> His orders
exports.foodOrderRouter.get("/my-order", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.userId;
        const myOrders = yield food_order_1.FoodOrderModel.find({
            user: user,
        });
        res.json(myOrders);
    }
    catch (e) {
        res.send(e);
    }
}));
exports.foodOrderRouter.post("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.userId;
    const { foodOrderItems, totalPrice, address } = req.body;
    const order = { user, foodOrderItems, totalPrice, address };
    const newOrder = yield food_order_1.FoodOrderModel.create(order);
    res.json(newOrder);
}));
