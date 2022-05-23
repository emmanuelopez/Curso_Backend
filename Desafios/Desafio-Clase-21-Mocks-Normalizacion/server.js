const express = require('express');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { connectDB } = require('./db');
const Mensaje = require('./models/mensaje')

//Obtengo los productos
const productosRouter = require('./routes/productos');
const productosMockRouter = require('./routes/productosMock');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', productosRouter);
app.use('/api', productosMockRouter);

const ContenedorP = require('./contenedores/contenedorProducto')

const Producto = new ContenedorP(
  {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "ecommerce",
      user: "root",
      password: "",
      port: 3306,
    },
    pool: { min: 0, max: 7 },
  },
  "productos"
);


//creo la tabla productos
(async () => {
  try {
    await Producto.crearTablaProductos();
    console.log("Creada la tabla productos");
  } catch (err) {
    console.error(err);
  }
})();

let listadoProductos
(async () => {
  try {
    listadoProductos = await Producto.getAll();
  } catch (err) {
    console.error(err);
  }
})();

connectDB();

const date = new Date();

const MENSAJES = [
  {
      email: "Admin",
      message: "Bienvenido al centro de mensajes!",
      fecha: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
  },
]

//Sockets

io.on("connection", (socket) => {
  console.log('Un cliente se ha conectado con id: ', socket.id);
  const emitMensajes = async () => {
    const mensajes = await Mensaje.find()
    io.emit('server:load_messages', mensajes);
  }
  emitMensajes()

  socket.on('client:new_message', async data => {
      const newMessage = new Mensaje(data);
      const savedMessage = await newMessage.save();
      io.emit('server:new_message', savedMessage);
  });
  /*
  socket.on('client:delete_message', async (id) => {
      await Mensaje.findByIdAndDelete(id);
      emitMensajes()
  });
  */
 /*
  socket.on('client:get_message', async (id) => {
      const mensaje = await Mensaje.findById(id);
      io.emit('server:selected_message', mensaje);
  });
  */
 /*
  socket.on('client:update_message', async (updatedMessage) => {
      await Mensaje.findByIdAndUpdate(updatedMessage._id, {
          title: updatedMessage.title,
          description: updatedMessage.description,
      });
      emitMensajes();
  })
  */
})

app.io = io;

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => console.log(`Servidor listo en el puerto ${PORT} ...`))
server.on('error', error => console.log(`Error en el servidor... Error: ${error}`));