import { Request, Response } from "express";
import { Category } from '../../Client/Database/Category';
import { ICategory } from '../../Interfaces/ICategory';

export function getAllCategories(req: Request, res: Response){
    Category.fetchAll({withRelated:['pictures']}).then((categories: ICategory[]) => {
        res.json(categories);
    }).catch((err: any) => res.send(err));
}

export function getCategoryById(req: Request, res: Response){
    new Category({'id':req.params.categoryId})
        .fetch()
        .then((category: ICategory) => {
            res.json(category);
        }).catch((err: any) => res.send(err));
}

export function saveCategory(req: Request, res: Response){
    let category: ICategory = req.body;
    delete category.pictures;
    Category.forge(category)
        .save()
        .then((category: ICategory) => {
            res.json(category);
        }).catch((err: any) => res.send(err));
}

export function getCategoryWithParams(req: Request, res: Response){
    new Category(req.body)
        .fetch()
        .then((categories: ICategory[]) => {
            res.json(categories);
        }).catch((err: any) => res.send(err));
}

export function deleteCategory(req: Request, res: Response){
    let category = req.body;
    Category.forge({id: category.id})
            .fetch()
            .then((category: any) => {
                if(!category) {
                    throw new Error('Delete category - no category found');
                }
                category.destroy();
                res.status(200);
                res.json(category);
            }).catch((err:any) => {
                res.status(500);
                res.send(err);
            });
}
