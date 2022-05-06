const {normalize, denormalize, schema} = require('normalizr')

// Muestra por pantalla el objeto original
const util = require('util')
function print(objeto) {
     console.log(util.inspect(objeto,false,12,true))
}


const chat = {
    id: 1,
    author: [
        {
            id: "eelopez29@gmail.com",
            nombre: "Ema",
            apellido: "Lopez",
            edad: 34,
            alias: "EEL",
            avatar: "foto1"
        }, 
        {
            id: "mircz@gmail.com",
            nombre: "Mirna",
            apellido: "Croco",
            edad: 38,
            alias: "MCM",
            avatar: "foto2"
        }, 
        {
            id: "orlnet@gmail.com",
            nombre: "Orlando",
            apellido: "Moreno",
            edad: 31,
            alias: "orly",
            avatar: "foto3"
        }, 
        
    ],
    text: [
        {
            id: 1000,
            email: "eelopez29@gmail.com",
            fecha: '4/5/2022 21:17:04',
            mensaje: "Hola, como va?"
        }, {
            id: 1001,
            email: "orlnet@gmail.com",
            fecha: '4/5/2022 21:17:08',
            mensaje: "Hola, todo bien?"
        }, {
            id: 1002,
            email: 'mircz@gmail.com',
            fecha: '4/5/2022 21:17:14',
            mensaje: "hola chicos!"
        }, {
            id: 1003,
            email: 'orlnet@gmail.com',
            fecha: '4/5/2022 21:17:15',
            mensaje: "Nos juntamos hoy?"
        }, {
            id: 1004,
            email: 'eelopez29@gmail.com',
            fecha: '4/5/2022 21:18:04',
            mensaje: "yo puedo"
        }, {
            id: 1005,
            email: "mircz@gmail.com",
            fecha: '4/5/2022 21:18:06',
            mensaje: "super"
        }, {
            id: 1006,
            email: "mircz@gmail.com",
            fecha: '4/5/2022 21:18:18',
            mensaje: "Les parece a las 18?"
        }, {
            id: 1007,
            email: 'orlnet@gmail.com',
            fecha: '4/5/2022 21:18:19',
            mensaje: "genial, nos vemos!"
        }
    ]
}

const authorSchema = new schema.Entity('author')
const textSchema = new schema.Entity('text')

const chatSchema = new schema.Entity('chat',{
    author: [authorSchema],
    text: [textSchema]
})

const normalizeObj = normalize(chat, chatSchema);


console.log("--------- estructra del objeto normalizado ----------")
print(normalizeObj);

console.log("--------- cant original ----------")
console.log(JSON.stringify(chat).length);

console.log("--------- cant normalizado ----------")
console.log(JSON.stringify(normalizeObj).length);

console.log("--------- cant desnormalizado ----------")
const denormalizeObj = denormalize(normalizeObj.result, chatSchema, normalizeObj.entities);
console.log(JSON.stringify(denormalizeObj).length);


console.log("--------- compresion ----------")
console.log((JSON.stringify(normalizeObj).length*100)/JSON.stringify(chat).length);