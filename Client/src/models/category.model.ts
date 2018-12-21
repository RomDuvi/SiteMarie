import { Picture } from './picture.model';
import { BaseModel } from './baseModel.model';

export class Category extends BaseModel {
    name: string;
    description: string;
    pictures: Picture[];
}
