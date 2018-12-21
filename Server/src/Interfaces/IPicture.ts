import { IBaseModel } from './IBaseModel';
export interface IPicture extends IBaseModel{
    displayName: string;
    path: string;
    description?: string;
    categories: any;
    file: any;
    fileName: string;
    type: string;
}