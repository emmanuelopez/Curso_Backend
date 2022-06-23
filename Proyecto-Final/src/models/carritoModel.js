import daoCarritos from '../databases/carritos/daoCarritos.js'

export async function crear(datos) {
    return {
        id: await daoCarritos.crearId(),
        nombre: datos.nombre,
        codigo: datos.codigo,
        fechaHora: datos.fechaHora,
        descripcion: datos.descripcion,
        precio: datos.precio,
        imagenURL: datos.imagenURL,
        stock: datos.stock,
    }
}