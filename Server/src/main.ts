import bodyParser = require("body-parser");
import { categoryRoutes, pictureRoutes, userRoutes } from './API/Routes/Routes';
import * as express from 'express';
import { Config } from './Client/config';
export const app = express();
const cors = require('cors');
const config = new Config();
var corsOptions = {
  origin: 'https://rizdelhuile.rduvi.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.get('*', cors(corsOptions), function (req, res, next) {
  next();
})

//#region Routes
userRoutes(app);
pictureRoutes(app);
categoryRoutes(app);


app.listen(config.appPort, () => {
    console.log("Example app listening at http://localhost:"+config.appPort+"/info")
 });