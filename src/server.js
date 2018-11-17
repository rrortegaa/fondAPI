const express = require('express')

const app = express()

const dishesRoutes = require('./routes/dishes')
const ordersRoutes = require('./routes/orders')

app.use(express.json()) // Parsea el contenido de la petición como json. Este Middleware debe ejecutarse antes de los demás endpoints

app.use('/dishes', dishesRoutes) // Parámetros: (Path, Router)
app.use('/orders', ordersRoutes) 

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'FondAPI running'
    })
})




module.exports = app