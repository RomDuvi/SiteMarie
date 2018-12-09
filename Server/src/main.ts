import bodyParser = require("body-parser");
import { userRoutes, pictureRoutes, categoryRoutes } from './API/Routes/Routes';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

export const app = express();

mongoose.connect('mongodb://localhost/SiteMarie');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/info', function (req, res) {
    res.send('La purée c\'est cool!')
  });
//#region Routes

userRoutes(app);
pictureRoutes(app);
categoryRoutes(app);

//#endregion

var server = app.listen(8081, () => {
    console.log("Example app listening at http://localhost:8081/info")
 })