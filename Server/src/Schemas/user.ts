import { IUser } from '../Interfaces/IUser';
import { Document, Schema, Model, model } from "mongoose";
import { IBaseModel } from '../Interfaces/IBaseModel';

export interface IUserModel extends IUser, IBaseModel, Document{
    fullName(): string;
}

export var UserSchema : Schema = new Schema({
    creationDate: Date,
    email: String,
    firstName: String,
    lastName: String,
    updateDate: Date
});

UserSchema.methods.fullName = (): string => {
    return `${this.firstName.trim()} ${this.lastName.trim()}`; 
}

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);