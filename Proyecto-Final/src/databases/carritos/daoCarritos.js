import DaoCarritosMemoria from './DaoCarritosMemoria.js'
import DaoCarritosMongoDb from './DaoCarritosMongoDb.js'
import DaoCarritosMySQL from './DaoCarritosMySQL.js'

import { MODO_PERSISTENCIA } from '../../config/config.js'

let daoCarritos
switch (MODO_PERSISTENCIA) {
    case 'mongodb':
        const { db } = await import('../shared/mongodb/mongoClient.js')
        daoCarritos = new DaoCarritosMongoDb(db)
        break
    case 'mysql':
        const { knex } = await import('../shared/sql/knexClient.js')
        daoCarritos = new DaoCarritosMySQL(knex)
        break
    default:
        daoCarritos = new DaoCarritosMemoria()

}

export default daoCarritos