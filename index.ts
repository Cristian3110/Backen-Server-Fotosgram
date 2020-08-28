import Server from './classes/server';
import mongoose from 'mongoose';

import cors from 'cors';

import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';

import userRoutes from "./routes/usuario";
import postRoutes from "./routes/post.routes";

const server = new Server();

// Body parser (rutas de middelwire)
server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use( bodyParser.json());


//FileUpload
server.app.use(fileUpload());
/***************************************************************************
 * en caso de que no se suba la imagen en la carpeta Temp, se realiza lo siguiente
 *  server.app.use(fileUpload({ useTempFiles: true}));
 *********************************************************************************/

 // Configurar COR (para que no tengamos el error en la petición http desde el frontend)
server.app.use(cors({ origin: true, credentials:true}));

// Rutas de mi aplicación
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);


// Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', 
        {useNewUrlParser:true, useCreateIndex:true}, (err)=>{
    
    if (err) throw err;

    console.log('Base de Datos Online');


        })

// Lavantar Express

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
