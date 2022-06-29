import DaoMySQL from '../shared/sql/DaoMySQL.js'

export default class DaoCarritosMySQL extends DaoMySQL {
    constructor(knex) {
        super(knex, 'carritos')
    }

    async agregarProducto(id, producto){
        let contenido = await this.knex.from(nombreTabla).select('*').where('id', parseInt(id));
        let productos = JSON.parse(contenido.productos);
        productos.push(producto);
        await this.knex.from(nombreTabla).where('id', parseInt(id)).update({"productos": JSON.stringify(productos)});
    }

    async borrarProducto(idCarrito, idProducto){
        let carrito = await this.knex.from(nombreTabla).select('*').where('id', parseInt(idCarrito));
        let productosParse = JSON.parse(carrito.productos);
        let productosUpdate = productosParse.filter(idEliminado => idEliminado.id !== parseInt(idProducto));
        await this.knex.from(nombreTabla).where('id', parseInt(idCarrito)).update({"productos": JSON.stringify(productosUpdate)});
    }
}
