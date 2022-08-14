import nuId from 'nuid'


export function crear(datos) {
    return {
        id: crearId(),
        name: datos.name,
        description: datos.description,
        price: datos.price,
        image: datos.image,
        stock: datos.stock
    }
}

function crearId() {
    let newId = nuId.next()
    return newId
}
