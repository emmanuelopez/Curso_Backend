import DaoMongoDb from '../shared/mongodb/DaoMongoDb.js'

export default class DaoCarritosMongoDb extends DaoMongoDb {
    constructor(db) {
        super(db, 'carritos')
    }

    async agregarProducto(idCarrito, objProducto) {
        await this.collection.updateOne({ id: idCarrito }, { '$push': { productos: objProducto } })
        return await this.listarPorId(idCarrito)
    }

    async quitarProducto(idCarrito, idProducto){
        await this.collection.updateOne({ id: idCarrito }, { '$pull': { productos: { "id" : { $eq: idProducto } } } })
        return await this.listarPorId(idCarrito)
    }
}
