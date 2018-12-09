import { Category } from './category.model';

export class Picture {
    _id: string;
    name: String;
    path: String;
    description: String;
    category: Category;
    creationDate: Date;
    updateDate: String;
}
