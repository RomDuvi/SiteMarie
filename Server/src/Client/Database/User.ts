import { context } from '../context';
import * as bcrypt from 'bcrypt-nodejs';
var Promise = require('bluebird');

export const User = context.Model.extend({
  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  idAttribute: 'id'
}, {
    login: connect
});


function connect(username: string, password: string) {
  return new Promise(function (resolve: any, reject: any)
  {
    if (!username || !password) {
      return reject(new Error('Login and password are both required!'));
    }
    return new User({ username: username.trim() })
      .fetch()
      .tap(function (user: any)
      {
        if (!user) {
          return reject(new Error('Invalid user'));
        }
        return bcrypt.compare(password, user.get('password'), (err: any, res: any) =>
        {
          if (!res) {
            return reject(new Error('Invalid password'));
          }else {
            resolve(user);
          }
        });
      });
  });
}