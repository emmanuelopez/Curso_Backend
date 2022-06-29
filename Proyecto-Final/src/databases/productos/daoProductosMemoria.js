import DaoMemoria from '../shared/memoria/DaoMemoria.js'

export default class DaoProductosMemoria extends DaoMemoria {
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

    async borrar(idProducto) {
        let posicion = this.objects.findIndex(element=> element.id === idProducto);
            if ( posicion > -1) {
                this.objects.splice(posicion,1); //borro producto
                return true; // retorno OK la eliminacion
            }
    }
}
