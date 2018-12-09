"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var Routes_1 = require("./API/Routes/Routes");
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
exports.app = express();
mongoose.connect('mongodb://localhost/SiteMarie');
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.use(cors());
exports.app.get('/info', function (req, res) {
    res.send('La purée c\'est cool!');
});
//#region Routes
Routes_1.userRoutes(exports.app);
Routes_1.pictureRoutes(exports.app);
Routes_1.categoryRoutes(exports.app);
//#endregion
var server = exports.app.listen(8081, function () {
    console.log("Example app listening at http://localhost:8081/info");
});
