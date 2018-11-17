//const { schema, model: Model } = require('mongoose') // Deconstrucción 
const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true,
        maxlength: 20,
        minlength: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        // default: '', // Lo usamos para pintar un contenido vacío
        maxlength: 140       
    }
})

//const model = mongoose.model(schema) // Compilar el modelo: Al modelo le pasamos el esquema

// model es el Modelo ya compilado. Exporto schema para poder usarlo en otro documento
module.exports = {
    model: mongoose.model('Dish', schema),
    schema
} 