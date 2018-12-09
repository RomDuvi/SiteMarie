import { ICategory } from './ICategory';
export interface IPicture{
    name: string;
    path: string;
    description?: string;
    category: ICategory;
}