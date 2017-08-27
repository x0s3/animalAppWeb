import MongoDb from './database';
const ObjectId = require('mongodb').ObjectId;

export default class Noticias {

    private autor: string;
    private fecha: Date;
    private titulo: string;
    private imagen: string;
    private likes: Number;
    private contenido: string;
    private localidad: string;


    public constructor();
    public constructor(titulo?: string, localidad?: string, contenido?: string, imagen?: string) {
        this.autor = 'x0s3';
        this.titulo = titulo;
        this.contenido = contenido;
        this.localidad = localidad;
        this.fecha = new Date();
        this.likes = 0;
        this.imagen = imagen;
    }

    private crearConector() {
        return new Promise((resolve, reject) => {
            resolve(MongoDb.getInstance().connect());
        });
    }

    public modificarNoticia(id) {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                MongoDb.getInstance().conexion.collection('noticias').updateOne(
                    { _id: id },
                    { $set: { 'titulo': 'hola manola' } },
                    (err, r) => {
                        if (r.upsertedCount == 1) return resolve(true);
                        else return reject(false);
                    }
                );
            });
        });
    }

    public eliminarNoticia(id) {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                MongoDb.getInstance().conexion.collection('noticias').deleteOne({ _id: new ObjectId(id) }).then((res) => {
                    if (res.deletedCount == 1) return resolve(true);
                    else return reject(false);
                });
            });
        });
    }

    public crearNoticia() {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                MongoDb.getInstance().conexion.collection('noticias').insertOne(this).then((result) => {
                    if (result.insertedCount == 1) return resolve(true);
                    else return reject(false);
                });
            });
        });
    }

    public getNoticias() {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                MongoDb.getInstance().conexion.collection('noticias').find({}, {
                    _id: 1, autor: 1, fecha: 1, titulo: 1, likes: 1, contenido: 1, localidad: 1, imagen: 1
                }).toArray((err, res) => {
                    return resolve(res);
                });
            });
        });
    }
}