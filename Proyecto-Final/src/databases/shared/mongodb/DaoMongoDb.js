import Dao from '../Dao.js'

export default class DaoMongoDb extends Dao {
    constructor(db, nombre) {
        this.collection = db.collection(nombre)
    }

    async guardar(document) {
        await this.collection.insertOne(document)
    }

    async listarTodas() {
        return this.collection.find().project({ _id: 0 }).toArray()
    }
}
