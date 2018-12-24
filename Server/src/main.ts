import bodyParser = require("body-parser");
import { categoryRoutes, pictureRoutes, userRoutes } from './API/Routes/Routes';
import * as express from 'express';
import { Config } from './Client/config';
export const app = express();
const cors = require('cors');
const config = new Config();
const corsOptions = {
  origin: config.clientPath,
  optionsSuccessStatus: 200 
}
export const serverBasePath = __dirname;


app.use(bodyParser.json({limit:'50mb'}));
app.use(cors(corsOptions));
app.disable('etag');
//#region Routes
userRoutes(app);
pictureRoutes(app);
categoryRoutes(app);


app.listen(config.appPort, () => {
    console.log("Example app listening at http://localhost:"+config.appPort+"/info")
 });