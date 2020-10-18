const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let facturaSchema = new Schema({
    nombre_usr: {
        type: String
    },
    nit: {
        type: String
    },
    fecha: {
        type: String
    },
    detalle: {
        type: [Map]
    },
    total: {
        type: Number
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('factura', facturaSchema);