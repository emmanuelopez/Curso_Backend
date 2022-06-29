import daoCarritos from '../databases/carritos/daoCarritos.js'


export async function crear(objProducto) {
    return {
        id: await daoCarritos.crearId(),
        productos: [
            objProducto
        ]
    }
}