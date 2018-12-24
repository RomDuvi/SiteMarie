import bodyParser = require("body-parser");
import { categoryRoutes, pictureRoutes, userRoutes } from './API/Routes/Routes';
import * as express from 'express';
import { Config } from './Client/config';
export const app = express();
const cors = require('cors');
const config = new Config();
app.use(cors());

//#region Routes
userRoutes(app);
pictureRoutes(app);
categoryRoutes(app);


app.listen(config.appPort, () => {
    console.log("Example app listening at http://localhost:"+config.appPort+"/info")
 });