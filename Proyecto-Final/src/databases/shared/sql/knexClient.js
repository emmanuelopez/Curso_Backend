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

knex.schema.hasTable('productos')
    .then((exists) => {
        if (exists) {
            console.log(`La tabla productos ya existe en la base de datos`);
        } else {
            return knex.schema
                .createTable('productos', (table) => {
                    table.integer('id');
                    table.string('nombre');
                    table.string('codigo');
                    table.string('fechaHora')
                    table.string('descripcion');
                    table.float('precio');
                    table.integer('stock');
                    table.string('imagenURL');
                })
                .then(() => {
                    console.log('Tabla productos creada');
                })
        }
    })
    .catch((err) => {
        console.log('Error creando la tabla productos', err);
    });

knex.schema.hasTable('carritos')
    .then((exists) => {
        if (exists) {
            console.log(`La tabla carritos ya existe en la base de datos`);
        } else {
            return knex.schema
                .createTable('carritos', (table) => {
                    table.integer('id');
                    table.json('productos');
                })
                .then(() => {
                    console.log(`Tabla carritos creada`);
                })
        }
    })
    .catch((err) => {
        console.log('Error creando la tabla carritos', err);
    });    

export { knex }