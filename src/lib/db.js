const mongoose = require('mongoose')

// connect es una función que me devuelve una nueva promesa
//const connect = () => new Promise( (resolve, reject) => {
//mongoose.connect('mongodb://localhost/fondapi', {// Conecta a la DB kodemia
    mongoose.connect('mongodb://rrortegaa:R040283@ds155653.mlab.com:55653/fonda', {
        useNewUrlParser: true // Nuevo tipo de parser
    })

    const db = mongoose.connection // Atributo connection: es la conexión ya hecha

    db.on('open', () => {
        console.warn('Connection open')
        resolve(mongoose)
    })
    db.on('error', () => {
        console.error('NO SE PUDO CONECTAR: ', error)
        reject(error)
    })
})

module.exports = { connect}