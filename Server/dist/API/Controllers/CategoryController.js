"use strict";
exports.__esModule = true;
var Category_1 = require("../../Schemas/Category");
function getAllCategories(req, res) {
    return Category_1.Category.find({}).populate('pictures').exec(function (err, categories) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(categories);
        }
    });
}
exports.getAllCategories = getAllCategories;
function getCategoryById(req, res) {
    return Category_1.Category.findById(req.params.categoryId).populate('pictures').exec(function (err, category) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(category);
        }
    });
}
exports.getCategoryById = getCategoryById;
function saveCategory(req, res) {
    var category = new Category_1.Category(req.body);
    var now = new Date();
    if (!category.creationDate) {
        category.creationDate = now;
    }
    category.updateDate = now;
    category.save(function (err, category) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(category);
        }
    });
}
exports.saveCategory = saveCategory;
function getCategoryByName(req, res) {
    Category_1.Category.find({ name: req.params.categoryName }).populate('pictures').exec(function (err, category) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(category);
        }
    });
}
exports.getCategoryByName = getCategoryByName;
