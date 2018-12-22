import bodyParser = require("body-parser");
import { categoryRoutes, pictureRoutes, userRoutes } from './API/Routes/Routes';
import * as express from 'express';
import { Config } from './Client/config';
export const app = express();
const cors = require('cors');
const config = new Config();
const corsWhitelist = ['http://localhost:4200', 'https://rizdelhuile.rduvi.com'];

app.use(bodyParser.json({limit:'50mb'}));
const corsOptions = {
    origin: function (origin: string, callback: any) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
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