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

export function createUser(req: Request, res: Response){
    var newUser = new User(req.body);
    newUser.save((err,user: IUser)=>{
        if(err){
            res.send(err);
        }else{
            res.json(user);
        }
    });
}