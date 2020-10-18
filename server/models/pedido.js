const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let pedidoSchema = new Schema({
    nombre_prod: {
        type: String
    },
    cantidad: {
        type: Number,
    },
    codigo_prod: {
        type: Number
    },
    nombre_usr: {
        type: String,
    },
    codigo_usr: {
        type: Number
    },
    fecha_pedido: {
        type: String
    },
    detalle: {
        type: [Map],
        required: [true, 'No se puede realizar un pedido sin productos']
    }
}, {
    versionKey: false
});

pedidoSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('pedido', pedidoSchema);
