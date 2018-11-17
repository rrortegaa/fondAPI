const express = require('express')

const router = express.Router()

const dish = require('../usecases/dishes') // Importa el usecase

router.get('/', async (req, res) => { // El callback lo marcamos como async
    const dishes = await dish.get()
    res.json({
        success: true,
        message: 'Done!',
        payload: {
            dishes
        }
    })
})

router.post('/', async (req, res) => {
    try {
        const dishData = req.body
        console.warn('dishData: ', dishData)
        console.warn("aquí si llego")
        const newDish = await dish.create(dishData) // Indico que espere la respuesta

        res.json ({
            success: true,
            message: 'New Dish Created',
            payload: { dish: newDish} // Pasa el objeto, cuyo key = dish y el value = newDish
        })
    } catch (error) {
        res.status(400) // Es una función setter, accede a la propiedad del status y la modifica con 400
        //res.sendStatus(400) // Manda el error 400 (Bad Request) al body de la respuesta
        res.json ({
            success: false,
            message: 'Dish could not be created',
            error: [
                error
            ]
        })
    }
})

router.delete('/:id', async (req, res) => {  // :id es un URI Parameter
    try {
        const { id } = req.params
        const dishDeleted = await dish.del(id)
        res.json ({
            success: true,
            message: 'Dish deleted',
            payload: { dish: dishDeleted}
        })
    } catch (error) {
        res.status(400) 
        res.json ({
            success: false,
            message: 'Dish could not be deleted',
            error: [
                error
            ]
        })
    }
})

module.exports =  router