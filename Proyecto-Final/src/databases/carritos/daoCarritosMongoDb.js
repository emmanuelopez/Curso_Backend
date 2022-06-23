import DaoMongoDb from '../shared/mongodb/DaoMongoDb.js'

export default class DaoCarritosMongoDb extends DaoMongoDb {
    constructor(db) {
        super(db, 'carritos')
    }
}