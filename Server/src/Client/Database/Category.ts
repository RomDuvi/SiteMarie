import { context } from '../context';
import { Picture } from './Picture';
import { Guid } from 'guid-typescript';
import { PicturesCategories } from './PicturesCategories';

export const Category = context.Model.extend({
    tableName: 'categories',
    hasTimestamps: ['createdAt', 'updatedAt'],
    pictures: function(){
      return this.belongsToMany(Picture).through(PicturesCategories);
    },
    defaults: {id: Guid.raw()}
  });