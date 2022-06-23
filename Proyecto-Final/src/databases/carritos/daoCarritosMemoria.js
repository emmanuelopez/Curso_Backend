import DaoMemoria from '../shared/memoria/DaoMemoria.js'

export default class DaoCarritosMemoria extends DaoMemoria {
    constructor() { super() }

    async guardar(producto) {
        this.objects.push(producto)
    }

    async actualizar(id, obj) {
        let producto = this.listarPorId(id)
        let nuevoProducto = Object.assign(producto, obj)
        this.objects = this.objects.map(producto => producto.id === id ? nuevoProducto : producto)
        return obj
    }

    async borrar(id) {
        this.objects = this.objects.filter(producto => producto.id !== id)
        return true
    }
}