"use strict";
exports.__esModule = true;
var Picture_1 = require("../../Schemas/Picture");
function getAllPictures(req, res) {
    return Picture_1.Picture.find({}).populate('categories').exec(function (err, pictures) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(pictures);
        }
    });
}
exports.getAllPictures = getAllPictures;
function getPictureById(req, res) {
    return Picture_1.Picture.findById(req.params.pictureId).populate('categories').exec(function (err, picture) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(picture);
        }
    });
}
exports.getPictureById = getPictureById;
function savePicture(req, res) {
    var picture = new Picture_1.Picture(req.body);
    var now = new Date();
    if (!picture.creationDate) {
        picture.creationDate = now;
    }
    picture.updateDate = now;
    picture.save(function (err, picture) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(picture);
        }
    });
}
exports.savePicture = savePicture;
function getPictureByName(req, res) {
    return Picture_1.Picture.find({ name: req.params.name }, function (err, pictures) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(pictures);
        }
    });
}
exports.getPictureByName = getPictureByName;
