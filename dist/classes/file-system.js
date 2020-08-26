"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Definiendo la clase para crear la carpetas necesarias para hacer el fileUpload y obtener el path
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, userID) {
        const path = this.crearCarpetaUsuario(userID); // 
    }
    ;
    crearCarpetaUsuario(userID) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userID);
        const pathUserTemp = pathUser + '/temp/';
        console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
