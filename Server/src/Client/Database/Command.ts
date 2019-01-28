import { context } from '../context';
import { Picture } from './Picture';

export const Command = context.Model.extend({
    tableName: 'commands',
    hasTimestamps: ['createdAt', 'updatedAt'],
    idAttribute: 'id',
    picture: function() {
        return this.belongsTo(Picture);
      }
});