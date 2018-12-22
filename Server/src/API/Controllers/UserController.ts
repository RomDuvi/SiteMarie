import { IUser } from '../../Interfaces/IUser';
import { Request, Response } from 'express';
import { User } from '../../Client/Database/User';
var Promise  = require('bluebird');
import * as bcrypt from 'bcrypt-nodejs';

export function getAllUsers(req: Request, res: Response){
    User.fetchAll().then((users: IUser[])=>{
        res.json(users);
    }).catch((err: any) => res.send(err));
}

export function getUserById(req: Request, res: Response){
    new User({'id':req.params.pictureId})
        .fetch()
        .then((user: IUser) => {
            res.json(user);
        }).catch((err: any) => res.send(err));
}

export function saveUser(req: Request, res: Response){
    var user: IUser = req.body;
    user.username = user.username.trim();
    bcrypt.hash(user.password, bcrypt.genSaltSync(10), null, (err: any, hash: any) => {
        if(err) throw new Error(err.message);
        user.password = hash;
        User.forge(user)
        .save()
        .then((user: IUser) => {
            res.json(user);
        }).catch((err: any)=>res.send(err));
      });

    
}

export function login(req: Request, res: Response) {
    User.login(req.body.username, req.body.password)
        .then((user: any) => {
            res.json(user.omit('password'));
        })
        .catch((err: Error) => {
            res.status(401).send(err.message);
        })
}