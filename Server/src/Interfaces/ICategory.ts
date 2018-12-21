import { IBaseModel } from './IBaseModel';
export interface ICategory extends IBaseModel{
    name: string;
    description: string;
    pictures: any;
}