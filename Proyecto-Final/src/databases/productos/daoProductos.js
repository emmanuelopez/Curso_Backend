import Dao from '../shared/dao.js'


class DaoProductos extends Dao {
    constructor(db) {
        super(db, 'productos')
    }

    async update(id, producto) {
        await this.collection.replaceOne({ "id": id }, { "id": producto.id, "nombre": producto.nombre, "codigo": producto.codigo, 
        "fechaHora": producto.fechaHora, "descripcion": producto.descripcion, "precio": producto.precio, "imagenURL": producto.imagenURL,
        "stock": producto.stock });
        return true
    }
}

const { db } = await import('../shared/mongodb/mongoClient.js')
const  daoProductos = new DaoProductos(db)

export default daoProductos
