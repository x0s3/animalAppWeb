import MongoDb from './database';
const ObjectId = require('mongodb').ObjectId;

export default class Animales {

    private nombre: string;
    private raza: string;
    private edad: Number;
    private descripcion: string;
    private lugar: string;
    private imagen: string;

    public constructor();
    public constructor(nombre?: string, raza?: string, edad?: Number, descripcion?: string, lugar?: string, imagen?: string) {
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.descripcion = descripcion;
        this.lugar = lugar;
        this.imagen = imagen;
    }

    private crearConector() {
        return new Promise((resolve, reject) => {
            resolve(MongoDb.getInstance().connect());
        });
    }

    public modificarAnimal(id) {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                MongoDb.getInstance().conexion.collection('animales').updateOne(
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

    public eliminarAnimal(id) {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                MongoDb.getInstance().conexion.collection('animales').deleteOne({ _id: new ObjectId(id) }).then((res) => {
                    if (res.deletedCount == 1) return resolve(true);
                    else return reject(false);
                });
            });
        });
    }

    public crearAnimal() {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                MongoDb.getInstance().conexion.collection('animales').insertOne(this).then((result) => {
                    if (result.insertedCount == 1) return resolve(true);
                    else return reject(false);
                });
            });
        });
    }

    public getAnimales() {
        return new Promise((resolve, reject) => {
            this.crearConector().then(() => {
                MongoDb.getInstance().conexion.collection('animales').find({}, {
                    _id: 1, nombre: 1, raza: 1, edad: 1, descripcion: 1, lugar: 1, imagen: 1
                }).toArray((err, res) => {
                    return resolve(res);
                });
            });
        });
    }
}