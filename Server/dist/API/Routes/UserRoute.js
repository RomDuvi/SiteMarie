"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../Controllers/UserController");
exports.userRoutes = function (app) {
    app.route("/users")
        .get(UserController_1.getAllUsers)
        .post(UserController_1.createUser);
    app.route("/user/:userId")
        .get(UserController_1.getUserById);
};
