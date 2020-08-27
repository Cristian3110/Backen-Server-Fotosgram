import { FileUpload } from '../interfaces/file-upload';

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';


// Definiendo la clase para crear la carpetas necesarias para hacer el fileUpload y obtener el path
export default class FileSystem{


        constructor(){};


        guardarImagenTemporal(file: FileUpload, userID: string){

            return new Promise ((resolve, reject)=>{ // Ahora nuestra función guardar retorna una promesa

                // Crear carpetas
                const path = this.crearCarpetaUsuario(userID) // 
    
                // Nombre archivo
               const nombreArchivo = this.generarNombreunico(file.name);
               // console.log(file.name); // para observar el nombre original del archivo (imagen)
               // console.log(nombreArchivo); // nombre proporcionado con el Id unico que se estableció
    
    
               //Mover el archivo del Temp a nuestra carpeta ((no es promesa sino callback))
               file.mv(`${path}/${nombreArchivo}`, (err:any)=>{ // representa el MoveFile (MV) 
                    
                if (err){
                    // no se pudo mover
                    reject(err);
                }else{
                    // todo salió bien
                    resolve();
                }
               } ) 

            });  

        };

        private generarNombreunico (nombreOriginal: string){
            
            // copyXXXXX.png
            const nombreArr = nombreOriginal.split('.'); // separados por punto ( . )
            const extension = nombreArr [nombreArr.length -1];
            
            // utilizando el paquete para el Id unico (npm install uniqid)
            const idUnico = uniqid();
            


            return `${idUnico}.${extension}`;


        }

        private crearCarpetaUsuario(userID:string){

            const pathUser= path.resolve(__dirname,'../uploads/', userID);
            const pathUserTemp= pathUser + '/temp/';

            // console.log(pathUser);

            const existe = fs.existsSync(pathUser);

            if(!existe){
                fs.mkdirSync(pathUser);
                fs.mkdirSync(pathUserTemp);
            }

            return pathUserTemp;
        }

}