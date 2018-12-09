"use strict";
exports.__esModule = true;
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
function saveUser(req, res) {
    var user = new user_1.User(req.body);
    var now = new Date();
    if (!user.creationDate) {
        user.creationDate = now;
    }
    user.updateDate = now;
    user.save(function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(user);
        }
    });
}
exports.saveUser = saveUser;
