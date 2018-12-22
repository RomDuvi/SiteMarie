import { context } from '../context';
import { Guid } from 'guid-typescript';
import * as bcrypt from 'bcrypt-nodejs';
var Promise  = require('bluebird');

export const User = context.Model.extend({
    tableName: 'users',
    hasTimestamps: ['createdAt', 'updatedAt'],
    defaults: {id: Guid.raw()},
  }, {
    login: Promise.method(function(username: string, password: string) {
      if(!username || !password){
        throw new Error('Login and password are both required!');
      }
      return new User({username: username.trim()})
              .fetch()
              .tap(function(user: any){
                if(!user){
                  throw new Error('Invalid user');
                }
                return bcrypt.compare(password, user.get('password'), (err:any, res: any)=>{
                        if(!res) throw new Error('Invalid password');
              });
      });
    })
  });
