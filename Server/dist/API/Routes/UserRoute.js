"use strict";
exports.__esModule = true;
var UserController_1 = require("../Controllers/UserController");
var PictureController_1 = require("../Controllers/PictureController");
exports.userRoutes = function (app) {
    app.route('/users')
        .get(UserController_1.getAllUsers)
        .post(UserController_1.createUser);
    app.route('/user/:userId')
        .get(UserController_1.getUserById);
};
exports.pictureRoutes = function (app) {
    app.route('/pictures')
        .get(PictureController_1.getAllPictures)
        .post(PictureController_1.createPicture);
    app.route('/picture/:pictureId')
        .get(PictureController_1.getPictureById);
    app.route('/picture/name/:pictureName')
        .get(PictureController_1.getPictureByName);
};
