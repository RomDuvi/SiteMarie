import {Express} from "express";
import { getAllUsers, getUserById, saveUser, login } from '../Controllers/UserController';
import { getAllPictures, savePicture, getPictureById, getPictureFile, deletePicture, updatePicture } from '../Controllers/PictureController';
import { getAllCategories, saveCategory, getCategoryById, deleteCategory } from '../Controllers/CategoryController';

export var userRoutes = (app: Express) => {
    app.route('/users')
        .get(getAllUsers)
        .post(saveUser)
        .put(saveUser);
    app.route('/users/:userId')
        .get(getUserById);
    app.route('/users/login')
        .post(login);
}

export var pictureRoutes = (app: Express) => {
    app.route('/pictures')
        .get(getAllPictures)
        .post(savePicture)
        .put(updatePicture);
    app.route('/pictures/:pictureId')
        .get(getPictureById);
    app.route('/pictures/file/:pictureId')
        .get(getPictureFile);
    app.route('/pictures/delete')
        .post(deletePicture);
}

export var categoryRoutes = (app: Express) => {
    app.route('/categories')
        .get(getAllCategories)
        .post(saveCategory)
        .put(saveCategory);
    app.route('/categories/:categoryId')
        .get(getCategoryById);
    app.route('/categories/delete')
        .post(deleteCategory);

}