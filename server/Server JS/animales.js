"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const ObjectId = require('mongodb').ObjectId;
class Animales {
    constructor(nombre, raza, edad, descripcion, lugar, imagen) {
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.descripcion = descripcion;
        this.lugar = lugar;
        this.imagen = imagen;
    }
    crearConector() {
        return new Promise((resolve, reject) => {
            resolve(database_1.default.getInstance().connect());
        });
    }
    modificarAnimal(id) {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                database_1.default.getInstance().conexion.collection('animales').updateOne({ _id: id }, { $set: { 'titulo': 'hola manola' } }, (err, r) => {
                    if (r.upsertedCount == 1)
                        return resolve(true);
                    else
                        return reject(false);
                });
            });
        });
    }
    eliminarAnimal(id) {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                database_1.default.getInstance().conexion.collection('animales').deleteOne({ _id: new ObjectId(id) }).then((res) => {
                    if (res.deletedCount == 1)
                        return resolve(true);
                    else
                        return reject(false);
                });
            });
        });
    }
    crearAnimal() {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                database_1.default.getInstance().conexion.collection('animales').insertOne(this).then((result) => {
                    if (result.insertedCount == 1)
                        return resolve(true);
                    else
                        return reject(false);
                });
            });
        });
    }
    getAnimales() {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                database_1.default.getInstance().conexion.collection('animales').find({}, {
                    _id: 1, nombre: 1, raza: 1, edad: 1, descripcion: 1, lugar: 1, imagen: 1
                }).toArray((err, res) => {
                    return resolve(res);
                });
            });
        });
    }
}
exports.default = Animales;
