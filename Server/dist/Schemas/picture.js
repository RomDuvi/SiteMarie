"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.PictureSchema = new mongoose_1.Schema({
    creationDate: Date,
    name: String,
    path: String,
    description: String,
    updateDate: Date
});
exports.Picture = mongoose_1.model('Picture', exports.PictureSchema);
