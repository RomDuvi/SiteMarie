"use strict";
exports.__esModule = true;
var UserController_1 = require("../Controllers/UserController");
var PictureController_1 = require("../Controllers/PictureController");
var CategoryController_1 = require("../Controllers/CategoryController");
exports.userRoutes = function (app) {
    app.route('/users')
        .get(UserController_1.getAllUsers)
        .post(UserController_1.saveUser)
        .put(UserController_1.saveUser);
    app.route('/user/:userId')
        .get(UserController_1.getUserById);
};
exports.pictureRoutes = function (app) {
    app.route('/pictures')
        .get(PictureController_1.getAllPictures)
        .post(PictureController_1.savePicture)
        .put(PictureController_1.savePicture);
    app.route('/picture/:pictureId')
        .get(PictureController_1.getPictureById);
    app.route('/picture/name/:pictureName')
        .get(PictureController_1.getPictureByName);
};
exports.categoryRoutes = function (app) {
    app.route('/categories')
        .get(CategoryController_1.getAllCategories)
        .post(CategoryController_1.saveCategory)
        .put(CategoryController_1.saveCategory);
    app.route('/category/:categoryId')
        .get(CategoryController_1.getCategoryById);
    app.route('/category/name/:categoryName')
        .get(CategoryController_1.getCategoryByName);
};
