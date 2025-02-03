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
exports.foodRouter = void 0;
const express_1 = require("express");
const food_1 = require("../models/food");
const auth_1 = require("../middleware/auth");
exports.foodRouter = (0, express_1.Router)();
exports.foodRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.category ? { category: req.query.category } : {};
    const items = yield food_1.FoodModel.find(filter).populate("category");
    res.json(items);
}));
exports.foodRouter.post("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = yield food_1.FoodModel.create({
        foodName: req.body.foodName,
        category: req.body.category,
        image: req.body.image,
    });
    res.json({
        message: "New Food created successfully.",
        newItem,
    });
}));
exports.foodRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const item = yield food_1.FoodModel.findById(id).populate("category");
    res.json(item);
}));
exports.foodRouter.put(":id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedItem = yield food_1.FoodModel.findByIdAndUpdate(req.params.id, {
            foodName: req.body.foodName,
        }, { new: true });
        res.json(updatedItem);
    }
    catch (e) {
        res.send(e);
    }
}));
exports.foodRouter.delete("/:id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedItem = yield food_1.FoodModel.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
}));
