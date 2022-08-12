import logger from '../../logger.js'


export default class Dao {
    constructor(db, nombre) {
        this.collectionName = nombre
        this.collection = db.collection(nombre)
    }

    async getAll() {
        let resultado = await this.collection.find().project({ _id: 0 }).toArray()
        return resultado
    }
    
    async getById(query) {
        let resultado = await this.collection.findOne({ "id": query })
        return resultado
    }

    async save(data) {
        let resultado = await this.collection.insertOne(data)
        return resultado
    }

    async deleteById(query) {
        let resultado = await this.collection.deleteOne({ "id": query })
        return resultado
    }

    async listByQuery(query){
        let resultado = await this.collection.find(query).toArray()
        return resultado
    }
}
