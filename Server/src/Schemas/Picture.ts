import { IPicture } from "../Interfaces/IPicture";
import { Document, Schema, Model, model } from 'mongoose';
import { IBaseModel } from '../Interfaces/IBaseModel';

export interface IPictureModel extends IPicture, IBaseModel, Document{

}

export var PictureSchema: Schema = new Schema({
    creationDate: Date,
    name: String,
    path: String,
    description: String,
    updateDate: Date
});

export const Picture: Model<IPictureModel> = model<IPictureModel>('Picture', PictureSchema);