import DaoMySQL from '../shared/sql/DaoMySQL.js'

export default class DaoProductosMySQL extends DaoMySQL {
    constructor(knex) {
        super(knex, 'productos')
    }

    async actualizar(id, producto) {
        let contenido = await this.knex.from(this.nombreTabla).where('id', parseInt(id)).update(producto);
        return contenido === 0 ? `Producto con id: ${id} no existente en la Base de datos` : `Producto con id: ${id} actualizado`;
    }

    async borrar(id) {
        let contenido = await this.knex.from(this.nombreTabla).where('id', parseInt(id)).del();
        return contenido === 0 ? `Producto con id: ${id} no existente en la base de datos` : `Producto con id: ${id} eliminado`;    
    }
}
