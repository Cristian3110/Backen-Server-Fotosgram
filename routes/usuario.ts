import {Router, Request, Response} from "express";
import { Usuario } from "../models/usuario.model";
import bcryt from 'bcrypt';



const userRoutes = Router();

// userRoutes.get('/prueba',(req:Request, res:Response)=>{

//     res.json({
//         ok: true,
//         mensaje: 'Todo funciona correctamente!!'
//     })

// });

// creando nuestro usuario
userRoutes.post('/create',(req:Request, res:Response)=>{
    
    const user={
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcryt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };

    Usuario.create( user ).then(userDB=>{
        
        res.json({
            ok: true,
            user: userDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })
    
});

export default userRoutes;
