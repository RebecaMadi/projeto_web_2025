"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./router/router"));
const express_handlebars_1 = require("express-handlebars");
const middlewares_1 = require("./middlewares/middlewares");
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, middlewares_1.logger)('completo'));
app.use(router_1.default);
app.engine("handlebars", (0, express_handlebars_1.engine)({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
