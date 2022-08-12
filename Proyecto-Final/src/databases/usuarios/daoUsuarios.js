import Dao from '../shared/dao.js'


class DaoUsuarios extends Dao {
    constructor(db) {
        super(db, 'usuarios')
    }

    async getByEmail(email) {
        return super.getById(email)
    }

    async getByUsername(username) {
        return this.collection.findOne({ "username": username })
    }

    async deleteByEmail(email) {
        return await super.deleteById({ email: email })
    }
}

const { db } = await import('../shared/mongodb/mongoClient.js')
const  daoUsuarios = new DaoUsuarios(db)

export default daoUsuarios
