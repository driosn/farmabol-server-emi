const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let pedidoSchema = new Schema({
    nombre_usr: {
        type: String,
    },
    id_usr: {
        type: String,
        required: true
    },
    fecha_pedido: {
        type: String
    },
    nit: {
        type: Number
    },
    detalle: {
        type: [Map],
        required: [true, 'No se puede realizar un pedido sin productos']
    },
    total: {
        type: Number
    }
}, {
    versionKey: false
});

pedidoSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('pedido', pedidoSchema);
