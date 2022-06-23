import axios from 'axios'
import { conectar, desconectar } from '../src/server.js'

await conectar()

const serverUrl = 'http://localhost:8080/api/productos'

await axios.post(serverUrl, {
    nombre: "Lovaglio Malbec",
    codigo: "art-01",
    fechaHora: "09/02/2022 20:00:00",
    descripcion: "Vino uva Malbec linea Lovaglio",
    precio: 950,
    stock: 100,
    imagenURL: "/images/L-Malbec.jpg",
},)

const { data: productos } = await axios.get(serverUrl)

console.log(productos)

await desconectar()