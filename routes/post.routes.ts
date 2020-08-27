import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';

//import fileUpload from 'express-fileupload';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';




    const postRoutes = Router();
    const fileSystem = new FileSystem;
    
    // Crear Posts paginados
    // En esta petición se puede dejar la verificación del token o dejarlo público como en este caso (quitamos en verifiToken)
    postRoutes.get('/', async ( req: any, res: Response)=>{

        // obteniendo el param para la pagina ? opcional y los trabajamos como un número
        let pagina = Number(req.query.pagina) || 1;
        let skip = pagina -1;
        skip = skip * 10; // Lógica para el salto de las páginas y salto de registros

        const posts = await Post.find()
            .sort({_id:-1}) // con esto especificamos el modo desendentes de los post o registros
            .skip (skip)
            .limit(10) // Limitando a que solo muestre los ultimos 10 post
            .populate('usuario', '-password')
            .exec();
                
        res.json({
            ok: true,
            pagina,
            posts
        });
    });

    // Crear Posts

    postRoutes.post('/', [verificaToken], (req: any, res: Response)=>{

        const body = req.body;
        body.usuario = req.usuario._id;

        const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
        body.imgs = imagenes;

        Post.create(body).then( async postDB =>{
            // Datos del usuario menos la contraseña
            await postDB.populate('usuario', '-password').execPopulate();
            
            res.json({
                ok: true,
                post: postDB
        });
 
            
        }).catch (err =>{
               res.json(err) 
        })
    });

    
    // Servicio para subir archivos
    postRoutes.post('/upload', [verificaToken], async (req:any, res: Response)=>{
        if (!req.files){
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningún archivo'
            });
        }

        const file: FileUpload = req.files.image;

        if (!file){
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningún archivo - image'
            });
        }

        if (!file.mimetype.includes('image')){
            return res.status(400).json({
                ok: false,
                mensaje: 'Lo que subió no es una imagen'
            });
        }

        await fileSystem.guardarImagenTemporal(file, req.usuario._id);

        res.json({
            ok: true,
            file: file.mimetype
        });


    });




    export default postRoutes;
