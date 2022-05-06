const { faker } = require('@faker-js/faker')
faker.locale = 'es'

class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    generar() {
        console.log("Generando 5 productos...")
        const nuevos = []
        for (let i = 1; i <= 5; i++) {
            const nuevoProducto = {
                nombre: faker.name.findName(),
                precio: faker.finance.amount(500, 3000, 0, '$'),
                imagen: faker.image.avatar(),
              }
            const guardado = this.guardar(nuevoProducto)
            nuevos.push(guardado)
        }
        return nuevos
    }

    guardar(elem) {
        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
        }
        const newElem = { ...elem, id: newId }
        this.elementos.push(newElem)
        return newElem
    }

    borrarAll() {
        this.elementos = []
    }
}

module.exports = ContenedorMemoria;
