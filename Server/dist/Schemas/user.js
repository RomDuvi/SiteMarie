"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    creationDate: Date,
    email: String,
    firstName: String,
    lastName: String,
    updateDate: Date
});
exports.UserSchema.pre("save", function (next) {
    var now = Date();
    if (!_this.creationDate) {
        _this.creationDate = now;
    }
    _this.updateDate = now;
    next();
});
exports.UserSchema.methods.fullName = function () {
    return _this.firstName.trim() + " " + _this.lastName.trim();
};
exports.User = mongoose_1.model("User", exports.UserSchema);
