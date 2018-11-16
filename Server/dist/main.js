"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var UserRoute_1 = require("./API/Routes/UserRoute");
exports.app = express();
mongoose.connect('mongodb://localhost/SiteCrete');
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.use(bodyParser.json);
//#region Routes
UserRoute_1.userRoutes(exports.app);
//#endregion
exports.app.listen(8000, function () {
    console.info("Server running on port 8000");
});
