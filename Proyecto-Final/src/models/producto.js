import nuId from 'nuid'


export function crear(datos) {
    return {
        id: crearId(),
        nombre: datos.nombre,
        codigo: datos.codigo,
        fechaHora: datos.fechaHora,
        descripcion: datos.descripcion,
        precio: datos.precio,
        imagenURL: datos.imagenURL,
        stock: datos.stock,
    }
}

function crearId() {
    let newId = nuId.next()
    return newId
}
