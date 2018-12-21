import { IBaseModel } from "./IBaseModel";

export interface IUser extends IBaseModel{
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password:string;
    isAdmin: boolean;
}