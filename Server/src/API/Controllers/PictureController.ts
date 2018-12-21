import { IPicture } from '../../Interfaces/IPicture';
import { Request, Response } from 'express';
import { Picture } from '../../Client/Database/Picture';
import { Category } from '../../Client/Database/Category';
import { ICategory } from '../../Interfaces/ICategory';
import { Config } from '../../Client/config';
import { encode } from 'base64-arraybuffer';

var Promise  = require('bluebird');
const fs = require('fs');
const config = new Config();

export function getAllPictures(req: Request, res: Response){
    Picture.fetchAll({withRelated:['categories']}).then((pictures) => {
        res.json(pictures);
    }).catch(err => res.send(err));
}

export function getPictureById(req: Request, res: Response){
    new Picture({'id':req.params.pictureId})
        .fetch()
        .then((picture: IPicture) => {
            res.json(picture);
        }).catch(err => res.send(err));
}

export function savePicture(req: Request, res: Response){
    let { categories, ...attributes } = req.body;
    let picture: IPicture = attributes;
    const path = config.picturePath + picture.fileName; //Remove space and special char 
    picture.path = path;

    fs.writeFile(path, picture.file, 'binary', (err)=>{
        if(err) throw new Error(err);
    });
    delete picture.fileName;
    delete picture.file;
    //Save picture in database
    Picture.forge(attributes)
        .save()
        .tap(picture => Promise.map(categories, (category: ICategory) => { 
            delete category.pictures;
            picture.related('categories').create(category);
        }))
        .then((picture: IPicture) => {
            res.json(picture);
        }).catch(err => res.send(err));
}

export function getPictureFile(req: Request, res: Response){
    var pictureId = req.params.pictureId;
    new Picture({'id': pictureId})
        .fetch()
        .then((picture) => {
            fs.readFile(picture.get('path'), (err, data)=>{
                if(err) throw new Error(err);
                res.contentType(picture.get('type'));
                res.send({'type':picture.get('type'),'file':encode(data)});
            })
        })
        .catch(err => res.send(err));
}

export function getPictureWithParams(req: Request, res: Response){
    new Category(req.body)
        .fetch()
        .then((picture: IPicture) => {
            res.json(picture);
        }).catch(err=>res.send(err));
}