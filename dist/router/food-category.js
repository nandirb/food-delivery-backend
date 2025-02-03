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
exports.foodCategoryRouter = void 0;
const express_1 = require("express");
const food_category_1 = require("../models/food-category");
const auth_1 = require("../middleware/auth");
exports.foodCategoryRouter = (0, express_1.Router)();
exports.foodCategoryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield food_category_1.FoodCategoryModel.find();
    res.json(items);
}));
exports.foodCategoryRouter.get("/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const item = yield food_category_1.FoodCategoryModel.findById(id);
    res.json(item);
}));
exports.foodCategoryRouter.post("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = yield food_category_1.FoodCategoryModel.create({
        categoryName: req.body.categoryName,
    });
    res.json({
        message: "New Food Category created successfully.",
        newItem,
    });
}));
exports.foodCategoryRouter.put(":id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedItem = yield food_category_1.FoodCategoryModel.findByIdAndUpdate(req.params.id, {
        categoryName: req.body.categoryName,
    }, { new: true });
    res.json(updatedItem);
}));
exports.foodCategoryRouter.delete("/:id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedItem = yield food_category_1.FoodCategoryModel.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
}));
