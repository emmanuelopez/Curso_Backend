import DaoProductosMemoria from './daoProductosMemoria.js'
import DaoProductosMongoDb from './daoProductosMongoDb.js'
import DaoProductosMySQL from './daoProductosMySQL.js'

import { MODO_PERSISTENCIA } from '../../config/config.js'

let daoProductos
switch (MODO_PERSISTENCIA) {
    case 'mongodb':
        const { db } = await import('../shared/mongodb/mongoClient.js')
        daoProductos = new DaoProductosMongoDb(db)
        break
    case 'mysql':
        const { knex } = await import('../shared/sql/knexClient.js')
        daoProductos = new DaoProductosMySQL(knex)
        break
    default:
        daoProductos = new DaoProductosMemoria()

}

export default daoProductos