import { Category } from '../../Schemas/Category';
import { Request, Response } from "express";
import { ICategory } from '../../Interfaces/ICategory';

export function getAllCategories(req: Request, res: Response){
    return Category.find({}).populate('pictures').exec((err, categories: ICategory[]) =>{
        if(err){
            res.send(err);
        }else{
            res.json(categories);
        }
    });
}

export function getCategoryById(req: Request, res: Response){
    return Category.findById(req.params.categoryId).populate('pictures').exec((err, category: ICategory)=>{
        if(err){
            res.send(err);
        }else{
            res.json(category);
        }
    });
}

export function saveCategory(req: Request, res: Response){
    var category = new Category(req.body);
    let now = new Date();

    if(!category.creationDate){
        category.creationDate = now;
    }

    category.updateDate = now;
    category.save((err, category:ICategory)=>{
        if(err){
            res.send(err);
        }else{
            res.json(category);
        }
    })
}


export function getCategoryByName(req: Request, res: Response){
    Category.find({name:req.params.categoryName}).populate('pictures').exec((err, category: ICategory) => {
        if(err){
            res.send(err);
        }else{
            res.json(category);
        }
    });
}
