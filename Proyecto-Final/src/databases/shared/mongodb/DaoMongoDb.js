import Dao from '../Dao.js'

export default class DaoMongoDb extends Dao {
    constructor(db, nombre) {
        super()
        this.collection = db.collection(nombre)
    }

    async crearId() {
        let productos = await this.collection.find().toArray()
        if (productos.length == 0) {
            return 1
        } else {
            return productos.length + 1
        }
    }

    async guardar(document) {
        await this.collection.insertOne(document)
    }

    async listarTodos() {
        return this.collection.find().project({ _id: 0 }).toArray()
    }

    async listarPorId(id) {
        return this.collection.findOne({ "id": id }, {projection: { _id: 0 }})
    }

    async actualizar(id, producto) {
        await this.collection.replaceOne({ "id": id }, { "id": producto.id, "nombre": producto.nombre, "codigo": producto.codigo, 
        "fechaHora": producto.fechaHora, "descripcion": producto.descripcion, "precio": producto.precio, "imagenURL": producto.imagenURL,
        "stock": producto.stock });
        return true
    }

    async borrar(id) {
        await this.collection.findOneAndDelete({ "id": id })
        return true
    }
}
