import DaoMemoria from '../shared/memoria/DaoMemoria.js'

export default class DaoCarritosMemoria extends DaoMemoria {
    constructor() { super() }

    async guardar(carrito) {
        this.objects.push(carrito)
    }

    async agregar(objProducto, posCarrito) {
        this.objects[posCarrito].productos.push(objProducto)
    }

    async buscarPosCarrito(idCarrito) {
        return this.objects.findIndex(carrito => carrito.id === idCarrito)
    }

    async buscarPosProducto(posCarrito, idProducto){
        let posicionProducto = this.objects[posCarrito].productos.findIndex(producto => producto.id === idProducto);
        return posicionProducto;
    }

    async modificoCantidad(posCarrito, posProducto){
        let cantidadActual = this.objects[posCarrito].productos[posProducto].cantidad;
        this.objects[posCarrito].productos[posProducto].cantidad = cantidadActual + 1; 
    }

    async borrarProducto(posCarrito, posProducto) {
        this.objects[posCarrito].productos.splice(posProducto, 1)
    }

    async borrar(posCarrito) {
        this.objects.splice(posCarrito,1)
    }
}