import { Picture } from '../../Schemas/Picture';
import { IPicture } from '../../Interfaces/IPicture';
import { Request, Response } from 'express';

export function getAllPictures(req: Request, res: Response){
    return Picture.find({}).populate('categories').exec((err, pictures: IPicture[]) => {
        if(err){
            res.send(err);
        }else{
            res.json(pictures);
        }
    });
}

export function getPictureById(req: Request, res: Response){
    return Picture.findById(req.params.pictureId).populate('categories').exec((err, picture: IPicture) => {
        if(err){
            res.send(err);
        }else{
            res.json(picture);
        }
    });
}

export function savePicture(req: Request, res: Response){
    var picture = new Picture(req.body);
    let now = new Date();

    if(!picture.creationDate){
        picture.creationDate = now;
    }

    picture.updateDate = now;
    picture.save((err, picture: IPicture) => {
        if(err){
            res.send(err);
        }else{
            res.json(picture);
        }
    });
}

export function getPictureByName(req: Request, res: Response){
    return Picture.find({name:req.params.name}, (err, pictures: IPicture[]) => {
        if(err){
            res.send(err);
        }else{
            res.json(pictures);
        }
    });
}