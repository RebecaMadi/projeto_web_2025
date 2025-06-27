import express, { Request, Response } from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import path from 'path';
import router from './router/router';
import { engine } from 'express-handlebars';
import { logger } from './middlewares/middlewares';

dotenv.config();
validateEnv();

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({extended: false}));
app.use(logger('completo'));
app.use(router);

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
