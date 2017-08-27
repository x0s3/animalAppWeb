const MongoClient = require('mongodb');

export default class MongoDb {

    private static db: MongoDb;
    public conexion: any;
    private uri: string = "mongodb://localhost:27017/animalXosing";

    private constructor() {
        this.conexion = {};
    }

    public static getInstance(): MongoDb {
        if (!MongoDb.db) {
            MongoDb.db = new MongoDb();
        }
        return MongoDb.db;
    }

    public connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.uri, (err, db) => {
                if (err) reject(err);
                this.conexion = db;
                return resolve(this);
            });
        });
    }
}