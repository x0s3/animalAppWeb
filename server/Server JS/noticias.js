"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const ObjectId = require('mongodb').ObjectId;
class Noticias {
    constructor(titulo, localidad, contenido, imagen) {
        this.autor = 'x0s3';
        this.titulo = titulo;
        this.contenido = contenido;
        this.localidad = localidad;
        this.fecha = new Date();
        this.likes = 0;
        this.imagen = imagen;
    }
    crearConector() {
        return new Promise((resolve, reject) => {
            resolve(database_1.default.getInstance().connect());
        });
    }
    modificarNoticia(id) {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                database_1.default.getInstance().conexion.collection('noticias').updateOne({ _id: id }, { $set: { 'titulo': 'hola manola' } }, (err, r) => {
                    if (r.upsertedCount == 1)
                        return resolve(true);
                    else
                        return reject(false);
                });
            });
        });
    }
    eliminarNoticia(id) {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                database_1.default.getInstance().conexion.collection('noticias').deleteOne({ _id: new ObjectId(id) }).then((res) => {
                    if (res.deletedCount == 1)
                        return resolve(true);
                    else
                        return reject(false);
                });
            });
        });
    }
    crearNoticia() {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                database_1.default.getInstance().conexion.collection('noticias').insertOne(this).then((result) => {
                    if (result.insertedCount == 1)
                        return resolve(true);
                    else
                        return reject(false);
                });
            });
        });
    }
    getNoticias() {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                database_1.default.getInstance().conexion.collection('noticias').find({}, {
                    _id: 1, autor: 1, fecha: 1, titulo: 1, likes: 1, contenido: 1, localidad: 1, imagen: 1
                }).toArray((err, res) => {
                    return resolve(res);
                });
            });
        });
    }
}
exports.default = Noticias;
