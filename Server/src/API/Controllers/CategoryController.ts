import { Request, Response } from "express";
import { Category } from '../../Client/Database/Category';
import { ICategory } from '../../Interfaces/ICategory';

export function getAllCategories(req: Request, res: Response){
    Category.fetchAll({withRelated:['pictures']}).then((categories: ICategory[]) => {
        res.json(categories);
    }).catch(err => res.send(err));
}

export function getCategoryById(req: Request, res: Response){
    new Category({'id':req.params.categoryId})
        .fetch()
        .then((category: ICategory) => {
            res.json(category);
        }).catch(err => res.send(err));
}

export function saveCategory(req: Request, res: Response){
    let category: ICategory = req.body;
    delete category.pictures;
    Category.forge(category)
        .save()
        .then((category: ICategory) => {
            res.json(category);
        }).catch(err => res.send(err));
}

export function getCategoryWithParams(req: Request, res: Response){
    new Category(req.body)
        .fetch()
        .then((categories: ICategory[]) => {
            res.json(categories);
        }).catch(err=>res.send(err));
}
