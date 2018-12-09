"use strict";
var _this = this;
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    creationDate: Date,
    email: String,
    firstName: String,
    lastName: String,
    updateDate: Date
});
exports.UserSchema.methods.fullName = function () {
    return _this.firstName.trim() + " " + _this.lastName.trim();
};
exports.User = mongoose_1.model("User", exports.UserSchema);
