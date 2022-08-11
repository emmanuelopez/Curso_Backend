import nuId from 'nuid'


export function crear(objProducto) {
    return {
        id: crearId(),
        productos: [
            objProducto
        ]
    }
}

function crearId() {
    let newId = nuId.next()
    return newId
}
