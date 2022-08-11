import Dao from '../shared/dao.js'


class DaoCarritos extends Dao {
    constructor(db) {
        super(db, 'carritos')
    }

    async add(idCarrito, objProducto) {
        let res = await this.collection.updateOne({ id: idCarrito }, { '$push': { productos: objProducto } })
        if (res.modifiedCount == 0) return false;
        return true
    }

    async remove(idCarrito, idProducto){
        let res = await this.collection.updateOne({ id: idCarrito }, { '$pull': { productos: { "id" : { $eq: idProducto } } } })
        if (res.modifiedCount == 0) return false;
        return true
    }
}

const { db } = await import('../shared/mongodb/mongoClient.js')
const daoCarritos = new DaoCarritos(db)

export default daoCarritos
