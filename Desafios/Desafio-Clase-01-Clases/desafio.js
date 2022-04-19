class Usuario {
    constructor (nombre, apellido){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = []
        this.mascotas = []
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        let libro = {nombre: nombre, author: autor}
        this.libros.push(libro)
    }

    getBookNames(){
        let nombresLibros = []
        this.libros.forEach(libro => nombresLibros.push(libro.nombre))
        return nombresLibros
    }
}

const usuario = new Usuario
usuario.nombre = "Emmanuel"
usuario.apellido = "Lopez"
usuario.libros = [
    {
        nombre: "La Odisea",
        author: "Homero"
    }
]
usuario.mascotas = ["Durga", "Cleo", "Tuki"]

console.log("El nombre completo es: ", usuario.getFullName())
usuario.addMascota("Marti")
console.log("Las mascotas son: ", usuario.mascotas)
console.log("El numero de mascotas es: ", usuario.countMascotas())
usuario.addBook("Moby Dick", "Herman Melville")
console.log("La lista de libros es:", usuario.libros)
console.log("Los nombres de los libros son: ", usuario.getBookNames())

