const mongoose = require('mongoose')

const {Schema } = mongoose

const schema = new Schema({
    dishes: {
        type: [String],
        required: true,
        minlength: 1
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20,
        minlegth: 2
    },
    status: {
        type: String,
        required: true,
        enum: [
            'active',
            'send',
            'aproved',
            'preparing',
            'ready',
            'dispatched',
            'payed',
            'canceled'
        ]
    }
})

module.exports = {
    schema,
    model: mongoose.model('Order', schema)

} 