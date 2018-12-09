"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    creationDate: Date,
    updateDate: Date,
    name: String,
    description: String,
    pictures: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Picture' }]
});
exports.Category = mongoose_1.model('Category', exports.CategorySchema);
