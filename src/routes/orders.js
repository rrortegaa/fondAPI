const express = require('express')

const router = express.Router()

const orders = require('../usecases/orders')

router.get('/', async (req, res) => {
    const allOrders = await orders.get()
    res.json({
        success: true,
        messagge: 'Done!',
        payload: {
            orders: allOrders
        }
    })
})

router.post('/', async (req, res) => {
    try {
        const orderData = req.body
        const orderCreated = await orders.create(orderData)
        res.json  ({
            success: true,
            messagge: 'New order created',
            payload: {
                order: orderCreated
            }
        })
    } catch(error) {
        res.status(400)
        res.json ({
            success: false,
            messagge: 'Could not create order',
            error: [ error ]
        })
    }
})

module.exports = router