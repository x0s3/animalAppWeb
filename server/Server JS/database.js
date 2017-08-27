"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require('mongodb');
class MongoDb {
    constructor() {
        this.uri = "mongodb://localhost:27017/animalXosing";
        this.conexion = {};
    }
    static getInstance() {
        if (!MongoDb.db) {
            MongoDb.db = new MongoDb();
        }
        return MongoDb.db;
    }
    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.uri, (err, db) => {
                if (err)
                    reject(err);
                this.conexion = db;
                return resolve(this);
            });
        });
    }
}
exports.default = MongoDb;
