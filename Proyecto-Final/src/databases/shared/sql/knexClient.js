import createKnex from 'knex'

const knex = createKnex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
})

export { knex }