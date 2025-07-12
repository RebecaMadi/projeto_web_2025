import express, { Request, Response } from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import path from 'path';
import router from './router/router';
import { engine } from 'express-handlebars';
import { logger } from './middlewares/middlewares';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import { sessionDuration } from './utils/config';
import cookieParser from 'cookie-parser';

dotenv.config();
validateEnv();

const app = express()
const PORT = process.env.PORT || 3333
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({extended: false}));
app.use(logger('completo'));

declare module 'express-session' {
  interface SessionData {
    uid: string;
  }
}

app.use(session({
  genid: () => uuidv4(),
  secret: 'Hi9Cf#mK98',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: sessionDuration }
}));
app.use(cookieParser());
app.use(router);

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
