import daoProductos from '../databases/productos/daoProductos.js'


export async function crear(datos) {
    return {
        id: await daoProductos.crearId(),
        nombre: datos.nombre,
        codigo: datos.codigo,
        fechaHora: datos.fechaHora,
        descripcion: datos.descripcion,
        precio: datos.precio,
        imagenURL: datos.imagenURL,
        stock: datos.stock,
    }
}