"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
// Definiendo la clase para crear la carpetas necesarias para hacer el fileUpload y obtener el path
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, userID) {
        // Crear carpetas
        const path = this.crearCarpetaUsuario(userID); // 
        // Nombre archivo
        const nombreArchivo = this.generarNombreunico(file.name);
        console.log(file.name); // para observar el nombre original del archivo (imagen)
        console.log(nombreArchivo); // nombre proporcionado con el Id unico que se estableció
    }
    ;
    generarNombreunico(nombreOriginal) {
        // copyXXXXX.png
        const nombreArr = nombreOriginal.split('.'); // separados por punto ( . )
        const extension = nombreArr[nombreArr.length - 1];
        // utilizando el paquete para el Id unico (npm install uniqid)
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userID) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userID);
        const pathUserTemp = pathUser + '/temp/';
        // console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
