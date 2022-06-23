import DaoMySQL from '../shared/sql/DaoMySQL.js'

export default class DaoCarritosMySQL extends DaoMySQL {
    constructor(knex) {
        super(knex, 'carritos')
    }
}