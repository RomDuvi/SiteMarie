import { context } from '../context';
import { Picture } from './Picture';
import { PicturesCategories } from './PicturesCategories';

export const Category = context.Model.extend({
    tableName: 'categories',
    hasTimestamps: ['createdAt', 'updatedAt'],
    idAttribute: 'id',
    pictures: function(){
      return this.belongsToMany(Picture).through(PicturesCategories);
    }
  },{
    dependents: ['pictures']
  });