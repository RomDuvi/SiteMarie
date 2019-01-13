import bodyParser = require("body-parser");
import { categoryRoutes, pictureRoutes, userRoutes } from './API/Routes/Routes';
import * as express from 'express';
import { Config } from './Client/config';
export const app = express();
const cors = require('cors');
const config = new Config();
export const serverBasePath = __dirname;

const corsOptions = {
    origin: config.clientPath,
    optionsSuccessStatus: 200 
}

app.use(bodyParser.json({limit:'50mb'}));
app.use(cors(corsOptions));
app.disable('etag'); //Remove chrome cache options for cors

app.get('/info', () => {return "La purée c'est cool!"})

//#region Routes
userRoutes(app);
pictureRoutes(app);
categoryRoutes(app);


app.listen(config.appPort, () => {
    console.log("Example app listening at http://localhost:"+config.appPort+"/info")
 });