import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import courses from '../server/routers/courses.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));

app.use('/', cors());

app.use('/courses', courses);

//data http://localhost:5000/

const URI =
  'mongodb+srv://nareku12:<Ducdec123>@cluster0.ckeesmj.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    });
  })
  .catch((err) => console.log('err', err));
