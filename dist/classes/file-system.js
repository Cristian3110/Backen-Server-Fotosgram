"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path")); // paquete para los path o rutas de node
const fs_1 = __importDefault(require("fs")); //paquete filesystem de node propiamente
const uniqid_1 = __importDefault(require("uniqid"));
// Definiendo la clase para crear la carpetas necesarias para hacer el fileUpload y obtener el path
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, userId) {
        return new Promise((resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaUsuario(userId); // 
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // console.log(file.name); // para observar el nombre original del archivo (imagen)
            // console.log(nombreArchivo); // nombre proporcionado con el Id unico que se estableció
            //Mover el archivo del Temp a nuestra carpeta ((no es promesa sino callback))
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    // no se pudo mover
                    reject(err);
                }
                else {
                    // todo salió bien
                    resolve();
                }
            });
        });
    }
    ;
    generarNombreUnico(nombreOriginal) {
        // copyXXXXX.png
        const nombreArr = nombreOriginal.split('.'); // separados por punto ( . )
        const extension = nombreArr[nombreArr.length - 1];
        // utilizando el paquete para el Id unico (npm install uniqid)
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp/';
        // console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imagenesDeTempHaciaPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp'); // capretas  
        const pathPost = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts'); //carpetas
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(userId, img) {
        // Path de los Posts
        const pathFoto = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts', img);
        // Si la imagen existe
        const existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathFoto;
    }
}
exports.default = FileSystem;
