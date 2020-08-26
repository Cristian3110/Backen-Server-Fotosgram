import { FileUpload } from '../interfaces/file-upload';

import path from 'path';
import fs from 'fs';


// Definiendo la clase para crear la carpetas necesarias para hacer el fileUpload y obtener el path
export default class FileSystem{


        constructor(){};


        guardarImagenTemporal(file: FileUpload, userID: string){

            const path = this.crearCarpetaUsuario(userID) // 
        };

        private crearCarpetaUsuario(userID:string){

            const pathUser= path.resolve(__dirname,'../uploads/', userID);
            const pathUserTemp= pathUser + '/temp/';

            console.log(pathUser);

            const existe = fs.existsSync(pathUser);

            if(!existe){
                fs.mkdirSync(pathUser);
                fs.mkdirSync(pathUserTemp);
            }

            return pathUserTemp;
        }

}