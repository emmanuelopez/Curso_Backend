import Dao from '../Dao.js'

export default class DaoMySQL extends Dao {
    constructor(knex, nombreTabla) {
        super()
        this.knex = knex
        this.nombreTabla = nombreTabla
    }

    async crearId() {
        let productos = await this.knex(this.nombreTabla).select()
        if (productos.length == 0) {
            return 1
        } else {
            return productos.length + 1
        }
    }

    async guardar(data) {
        await this.knex(this.nombreTabla).insert(data)
    }

    async listarTodos() {
        return this.knex(this.nombreTabla).select()
    }

    async listarPorId(id) {
        let contenido = await this.knex.from(this.nombreTabla).select('*').where('id', parseInt(id));
        return (contenido.length === 0 ? contenido = `No existe en la tabla ${this.nombreTabla} el elemento con id: ${id}` : contenido );
    }
}
