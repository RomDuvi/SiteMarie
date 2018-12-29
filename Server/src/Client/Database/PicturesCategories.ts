import { context } from "../context";
import { Picture } from "./Picture";
import { Category } from './Category';

export const PicturesCategories = context.Model.extend({
    tableName: 'pictures_categories',
    picture: () => this.belongsTo(Picture),
    Category: () => this.belongsTo(Category),
    idAttribute: 'id'
});