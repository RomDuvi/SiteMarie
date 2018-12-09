import {Express} from "express";
import { getAllUsers, getUserById, saveUser } from '../Controllers/UserController';
import { getAllPictures, savePicture, getPictureById, getPictureByName } from '../Controllers/PictureController';
import { getAllCategories, saveCategory, getCategoryById, getCategoryByName } from '../Controllers/CategoryController';

export var userRoutes = (app: Express) => {
    app.route('/users')
        .get(getAllUsers)
        .post(saveUser)
        .put(saveUser);
    app.route('/user/:userId')
        .get(getUserById);
}


export var pictureRoutes = (app: Express) => {
    app.route('/pictures')
        .get(getAllPictures)
        .post(savePicture)
        .put(savePicture);
    app.route('/picture/:pictureId')
        .get(getPictureById);
    app.route('/picture/name/:pictureName')
        .get(getPictureByName); 
}

export var categoryRoutes = (app: Express) => {
    app.route('/categories')
        .get(getAllCategories)
        .post(saveCategory)
        .put(saveCategory);
    app.route('/category/:categoryId')
        .get(getCategoryById);
    app.route('/category/name/:categoryName')
        .get(getCategoryByName);

}