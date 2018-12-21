import { Category } from './category.model';
import { BaseModel } from './baseModel.model';
import { SafeUrl } from '@angular/platform-browser';

export class Picture extends BaseModel {
    id: string;
    name: string;
    path: string;
    type: string;
    description: string;
    categories: Category[];
    file: any;
    src: SafeUrl;
    loaded = false;
}
