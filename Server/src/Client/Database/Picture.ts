import { context } from '../context';
import { Category } from './Category';
import { Guid } from 'guid-typescript';
import { PicturesCategories } from './PicturesCategories';

export const Picture = context.Model.extend({
    tableName: 'pictures',
    hasTimestamps: ['createdAt', 'updatedAt'],
    categories: function(){
      return this.belongsToMany(Category).through(PicturesCategories);
    },
    defaults: {id: Guid.raw()}
  });