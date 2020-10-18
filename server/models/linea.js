const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let lineaSchema = new Schema({
    codigo: {
        type: String,
        unique: true,
        required: [true, 'El codigo de la linea es obligatorio']
    },
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion de la linea es obligatoria']
    }
}, {
    versionKey: false
})

lineaSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('linea', lineaSchema);