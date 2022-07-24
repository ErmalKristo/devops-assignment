import express from 'express';
import { ValidationError }  from 'express-validation';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from '../server/index.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

// mount all routes on / path
app.use('/', routes);

app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
  
    return res.status(500).json(err)
});


export default app;