import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose from 'mongoose';


const server = new Server();



// Rutas de mi aplicación
server.app.use('/user', userRoutes);

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
