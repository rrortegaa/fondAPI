const Order = require('../../models/order').model // Importamos el modelo
//const { model: Orders } = require('../../models/order') // Deconstrución: Linea alternativa a la anterior

// Primera opción:
//async function get () {
//    const allOrders = await Order.find({}).exec() 
//    return allOrders
//}

// Segunda opción:
//function get () {
//    return Order.find({}).exec()
//}

const dish =  require('../dishes')

// Tercera opción:
const get = () => Order.find({}).exec()

const create = async (orderData) => {
    const { dishes = [] } = orderData // Deconstruimos y agregamos un valor por default

    const dishPromises = dishes.map((dishId) => {
        return dish.getById(dishId)
    })

    const dishPromisesResult = await Promise.all(dishPromises)

    const invalidDishes = dishPromisesResult.reduce((reducer, current, index) => {
        if ( current == null ) return [ ...reducer, dishes[index] ] // spread operator:  ... // Regresa el arreglo con el id del eleento que no existe
        return reducer
    }, [])

    if( invalidDishes.length > 0 ) throw new Error('Invalid Dishes: ${ invalidDishes.join(',') }')

    const newOrder = new Order(orderData) // Creamos una nueva instancia de Order
    return newOrder.save() // Nos devuelve una promesa
} 

module.exports = {
    get,
    create
}
