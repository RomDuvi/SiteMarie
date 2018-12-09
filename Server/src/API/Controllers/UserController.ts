import { User } from '../../Schemas/user';
import { IUser } from '../../Interfaces/IUser';
import { Request, Response } from 'express';

export function getAllUsers(re: Request, res: Response){
    return User.find({},(err, users: IUser[]) => {
        if(err){
            res.send(err);
        }else{
            res.json(users);
        }
    });
}

export function getUserById(req: Request, res: Response){
    return User.findById(req.params.userId, (err, user:IUser)=>{
        if(err){
            res.send(err)
        }else{
            res.json(user);
        }
    })
}

export function saveUser(req: Request, res: Response){
    var user = new User(req.body);
    let now = new Date();
    if(!user.creationDate){
        user.creationDate = now;
    }
    user.updateDate = now;
    user.save((err,user: IUser)=>{
        if(err){
            res.send(err);
        }else{
            res.json(user);
        }
    });
}