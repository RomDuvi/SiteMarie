import { IPicture } from '../../Interfaces/IPicture';
import { Request, Response } from 'express';
import { Picture } from '../../Client/Database/Picture';
import { Category } from '../../Client/Database/Category';
import { Config } from '../../Client/config';
import { encode } from 'base64-arraybuffer';
import { serverBasePath } from '../../main';
import { Promise } from 'bluebird';
import { ICategory } from '../../Interfaces/ICategory';

const path = require('path');
const fs = require('fs');
const config = new Config();
const jimp = require('jimp');


export function getAllPictures(req: Request, res: Response) {
    Picture.fetchAll({ withRelated: ['categories'] }).then((pictures: any) => {
        res.json(pictures);
    }).catch((err: any) => res.send(err));
}

export function getPictureById(req: Request, res: Response) {
    new Picture({ 'id': req.params.pictureId })
        .fetch()
        .then((picture: IPicture) => {
            res.json(picture);
        }).catch((err: any) => res.send(err));
}

export function savePicture(req: Request, res: Response) {
    let { categories, ...attributes } = req.body;
    categories.push({id: 1});
    let picture: IPicture = attributes;
    const picturePath = path.join(serverBasePath, config.picturePath, picture.fileName); //Remove space and special char 
    picture.path = picturePath;
    fs.writeFile(picturePath, picture.file, 'binary', (err: any) => {
        if (err) throw new Error(err);
        createThumbnail(picturePath, (output: string) => {
            if(!output) throw new Error('No output path provided for thumbnail');
            picture.thumbPath = output;
            jimp.read(picturePath).then((image: any) => {
                picture.width = image.bitmap.width;
                picture.height = image.bitmap.height;
                //Save picture in database
                updateAttributes(picture, categories, res);
            });
        });
    });
}

export function updatePicture(req: Request, res: Response) {
    let { categories, ...attributes } = req.body;
    let picture: IPicture = attributes;
    updateAttributes(picture, categories, res);
}

export function updateAttributes(picture: IPicture, categories: any, res: Response) {
    delete picture.fileName;
    delete picture.file;
    delete picture.createdAt;
    delete picture.updatedAt;
    Picture.forge(picture)
                .save()
                .tap((picture: any) => Promise.map(categories, (category: ICategory) => { 
                    delete category.pictures;
                    picture.related('categories').create(category);
                }))
                .then((picture: IPicture) => {
                    res.json(picture);
                }).catch((err: any) => res.send(err));
}

export function getPictureFile(req: Request, res: Response) {
    var pictureId = req.params.pictureId;
    new Picture({ 'id': pictureId })
        .fetch()
        .then((picture: any) => {
            fs.readFile(picture.get('thumbPath'), (err: any, data: any) => {
                if (err) throw new Error(err);
                res.contentType(picture.get('type'));
                res.send({ 'type': picture.get('type'), 'file': encode(data) });
            })
        })
        .catch((err: any) => res.send(err));
}

export function getPictureWithParams(req: Request, res: Response) {
    new Category(req.body)
        .fetch()
        .then((picture: IPicture) => {
            res.json(picture);
        }).catch((err: any) => res.send(err));
}

export function deletePicture(req: Request, res: Response) {
    let { categories, ...attributes } = req.body;
    let picture: IPicture = attributes;
    Picture.forge({'id': picture.id})
           .fetch()
           .then((picture: any) => {
                if(!picture) {
                    throw new Error('Delete picture - no picutre found');
                }
                picture.destroy();
                res.status(200);
                res.json(picture); 
            }).catch((err: any) => {
                res.status(500);
                res.send(err)
            });
}

export function createThumbnail(imagePath: string, callBack: any) {
    var img = jimp.read(imagePath);
    var watermark = jimp.read(path.join(serverBasePath, config.picturePath, 'watermark.png'));
    var output = imagePath.replace(/(\.[\w\d_-]+)$/i, '_thumb$1');
    Promise.all([img, watermark]).then(images => {
        var src = images[0];
        var dst = images[1];
        src.scale(0.25);
        dst.scaleToFit(src.bitmap.width - 5, src.bitmap.height - 5);

        src.composite(dst, src.bitmap.width - (dst.bitmap.width), (src.bitmap.height/2) - (dst.bitmap.height/2))
            .write(output, callBack(output))
    });
}