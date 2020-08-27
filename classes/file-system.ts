import { FileUpload } from '../interfaces/file-upload';

import path from 'path'; // paquete para los path o rutas de node
import fs from 'fs'; //paquete filesystem de node propiamente
import uniqid from 'uniqid'; 


// Definiendo la clase para crear la carpetas necesarias para hacer el fileUpload y obtener el path
export default class FileSystem{


        constructor(){};


        guardarImagenTemporal(file: FileUpload, userId: string){

            return new Promise ((resolve, reject)=>{ // Ahora nuestra función guardar retorna una promesa

                // Crear carpetas
                const path = this.crearCarpetaUsuario(userId) // 
    
                // Nombre archivo
               const nombreArchivo = this.generarNombreUnico(file.name);
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
               }); 

            });  

        };

        private generarNombreUnico (nombreOriginal: string){
            
            // copyXXXXX.png
            const nombreArr = nombreOriginal.split('.'); // separados por punto ( . )
            const extension = nombreArr [nombreArr.length -1];
            
            // utilizando el paquete para el Id unico (npm install uniqid)
            const idUnico = uniqid();
            


            return `${idUnico}.${extension}`;


        }

        private crearCarpetaUsuario(userId:string){

            const pathUser= path.resolve(__dirname,'../uploads/', userId);
            const pathUserTemp= pathUser + '/temp/';

            // console.log(pathUser);

            const existe = fs.existsSync(pathUser);

            if(!existe){
                fs.mkdirSync(pathUser);
                fs.mkdirSync(pathUserTemp);
            }

            return pathUserTemp;
        }

        imagenesDeTempHaciaPost(userId: string){

            const pathTemp= path.resolve(__dirname,'../uploads/', userId, 'temp');  // capretas  
            const pathPost= path.resolve(__dirname,'../uploads/', userId, 'posts'); //carpetas

            if (!fs.existsSync(pathTemp)){
                return[];
            }

            if (!fs.existsSync(pathPost)){
                fs.mkdirSync(pathPost);
            }

            const imagenesTemp = this.obtenerImagenesEnTemp(userId);

            imagenesTemp.forEach(imagen=>{
                fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
            })

            return imagenesTemp;


  
        }

        private obtenerImagenesEnTemp(userId:string){

            const pathTemp = path.resolve(__dirname,'../uploads/', userId, 'temp');
            return fs.readdirSync(pathTemp) || [];
        }

            
        getFotoUrl(userId:string, img: string){
        
            // Path de los Posts
            const pathFoto = path.resolve(__dirname, '../uploads/', userId, 'posts', img);

            // Si la imagen existe
             const existe = fs.existsSync(pathFoto);
              
                 if(!existe){
                     return path.resolve(__dirname, '../assets/400x250.jpg');
                }


            return pathFoto;

                
        }



}