import { context } from '../context';
import { Category } from './Category';
import { PicturesCategories } from './PicturesCategories';

export const Picture = context.Model.extend({
    tableName: 'pictures',
    hasTimestamps: ['createdAt', 'updatedAt'],
    idAttribute: 'id',
    categories: function(){
      return this.belongsToMany(Category).through(PicturesCategories);
    }
  });