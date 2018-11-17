const Dish = require('../../models/dish').model // Dish es uno de nuestros modelos. Del objeto exportado solo ocupamos el modelo (.model)

// Función asincrona
async function get() {
    const allDishes = await Dish.find({}).exec() // Consulta en la DB. Exec (ejecuta) nos trae una promesa
    return allDishes // las funciones async devuelven una promesa de exito o error
    // return Dish.find({}).exec() //Alternativa a las dos lineas anteriores y quitando async
}

// USECASE create
async function create( dishData) {
   
    const { name } = dishData // Deconstruyendo Dishdata, estoy sacando el nombre 
    // existingDishes es un arreglo de docuemntos (los documentos son objetos)
    const existingDishes = await Dish.find({ name }).exec() // En el modelo Dish, busca en la propiedad name: name el valor

    const dishExists = existingDishes.length > 0
    
    // Error es una clase, estamos creando una nueva instancia de error para mandarla
    if(dishExists) throw new Error('Dish already exists')

    const dish = new Dish(dishData)
    const disCreated = await dish.save() // save() no necesita el uso de exec()
    return dishCreated
}

function del(id) {
    // sin exec() estoy obligada a poner el callback
    return Dish.findByIdAndDelete(id).exec() // exec obliga a devolver una promesa aunque no sea una funcion asíncrona

}

function getById (id) {
    return Dish.findById(id).exec() // Devuelve una promesa con el find
}

module.exports = {
    get,
    create,
    del,
    getById
}