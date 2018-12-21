import bodyParser = require("body-parser");
import { categoryRoutes, pictureRoutes, userRoutes } from './API/Routes/Routes';
import * as express from 'express';
import { Config } from './Client/config';
export const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = new Config();


app.use(bodyParser.json({limit:'50mb'}));
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/info', function (req, res) {
    res.send('La purée c\'est cool!')
  });
//#region Routes

userRoutes(app);
pictureRoutes(app);
categoryRoutes(app);

app.listen(config.appPort, () => {
    console.log("Example app listening at http://localhost:"+config.appPort+"/info")
 });