import { ICategory } from "../Interfaces/ICategory";
import { IBaseModel } from '../Interfaces/IBaseModel';
import { Schema, Model, model } from 'mongoose';
export interface ICategoryModel extends ICategory, IBaseModel {

}

export var CategorySchema: Schema = new Schema({
    creationDate: Date,
    updateDate: Date,
    name: String,
    description: String,
    pictures: [{type: Schema.Types.ObjectId, ref:'Picture'}]
});

export const Category: Model<ICategoryModel> = model<ICategoryModel>('Category', CategorySchema);
