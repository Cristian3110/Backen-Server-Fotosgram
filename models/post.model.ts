

import {Schema, Document, model} from 'mongoose'

const postSchema = new Schema({

    created: {
        type:Date
    },
    mensaje: {
        type:String
    },
    img: [{
        type: String
    }],
    coords: {
        type: String // -14.23253, 12.256486
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});

    postSchema.pre<Ipost>('save', function(next){
        this.created= new Date();
        next();
    });

    interface Ipost extends Document {
        created: Date;
        mensaje: string;
        img: string[];
        coords: string;
        usuario: string;
    }