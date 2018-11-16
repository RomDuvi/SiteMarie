"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../Schemas/user");
function getAllUsers(re, res) {
    return user_1.User.find({}, function (err, users) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(users);
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(req, res) {
    return user_1.User.findById(req.params.userId, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(user);
        }
    });
}
exports.getUserById = getUserById;
function createUser(req, res) {
    var newUser = new user_1.User(req.body);
    newUser.save(function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(user);
        }
    });
}
exports.createUser = createUser;
