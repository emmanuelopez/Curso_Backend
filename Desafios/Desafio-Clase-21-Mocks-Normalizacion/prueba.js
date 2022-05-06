const {normalize, denormalize, schema} = require('normalizr')

const util = require('util')
function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}


const chat = {
    id: 1,
    autor: [
        {
            id: 1,
            nombre: "pepe",
            apellido: "perez"
        }, {
            id: 2,
            nombre: "juan",
            apellido: "perez"
        }, {
            id: 3,
            nombre: "ale",
            apellido: "perez"
        }, {
            id: 4,
            nombre: "asdsa",
            apellido: "perez"
        }
    ],
    mensajes: [
        {
            id: 101,
            text: 'dsadasdas',
            autor: "pepe"
        }, {
            id: 102,
            text: 'aaaaaaa',
            autor: "pepe"
        }, {
            id: 103,
            text: 'bbb',
            autor: "pepe"
        }, {
            id: 104,
            text: 'ccccc',
            autor: "pepe"
        }
    ]
}

const autorSchema = new schema.Entity('autor')

const mensajeSchema = new schema.Entity('mensajes')

const postSchema = new schema.Entity('post',{
    autor: [autorSchema],
    mensajes:[mensajeSchema]
})

const chatSchema = new schema.Entity('chat',{
    chat:[postSchema]
})


const normalizeObj = normalize(chat, postSchema);

print(normalizeObj);

console.log('el obejeto original tiene  ' + JSON.stringify(chat).length);

console.log('el obejeto normalizado tiene ' + JSON.stringify(normalizeObj).length);

const denormalizeObj = denormalize(normalizeObj.result, postSchema, normalizeObj.entities);

console.log('el obejeto normalizado tiene ' + JSON.stringify(denormalizeObj).length);