import {Express} from "express";
import { getAllUsers, getUserById, createUser } from '../Controllers/UserController';

export var userRoutes = (app: Express) => {
    app.route("/users")
        .get(getAllUsers)
        .post(createUser);
    app.route("/user/:userId")
        .get(getUserById);
}  