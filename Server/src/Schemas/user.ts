import { IUser } from '../Interfaces/IUser';
import { Document, Schema, Model, model } from "mongoose";

export interface IUserModel extends IUser, Document{
    fullName(): string;
}

export var UserSchema : Schema = new Schema({
    creationDate: Date,
    email: String,
    firstName: String,
    lastName: String,
    updateDate: Date
});

UserSchema.pre("save",(next)=>{
    let now = Date();
    if(!this.creationDate){
        this.creationDate = now;
    }

    this.updateDate = now;
    next();
});

UserSchema.methods.fullName = (): string => {
    return `${this.firstName.trim()} ${this.lastName.trim()}`; 
}

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);