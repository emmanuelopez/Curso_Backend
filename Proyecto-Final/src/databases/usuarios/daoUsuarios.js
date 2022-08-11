import Dao from '../shared/dao.js'


class DaoUsuarios extends Dao {
    constructor(db) {
        super(db, 'usuarios')
    }

    async getByEmail(email) {
        return super.getById({"email":email})
    }

    async getByUsername(username) {
        return super.getById({"username":username})
    }

    async deleteByEmail(email) {
        return await super.deleteById({ email: email })
    }
}

const { db } = await import('../shared/mongodb/mongoClient.js')
const  daoUsuarios = new DaoUsuarios(db)

export default daoUsuarios
