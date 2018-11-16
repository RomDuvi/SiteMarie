import * as express from "express";
import * as mongoose from "mongoose";
import bodyParser = require("body-parser");
import { userRoutes } from "./API/Routes/UserRoute";

export const app = express();

mongoose.connect('mongodb://localhost/SiteCrete');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

//#region Routes

userRoutes(app);

//#endregion

app.listen(8000, () => {
    console.info("Server running on port 8000");
});