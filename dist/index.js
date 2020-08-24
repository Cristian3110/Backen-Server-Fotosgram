"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const server = new server_1.default();
// Body parser (rutas de middelwire)
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Rutas de mi aplicación
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_routes_1.default);
// Conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de Datos Online');
});
// Lavantar Express
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
