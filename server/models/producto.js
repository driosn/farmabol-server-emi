const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    codigo: {
        type: Number,
        unique: true
    },
    familia: {
        type: String,
    },
    linea: {
        type: String,
    },
    nombre: {
        type: String
    },
    precio: {
        type: Number
    },
}, {
    versionKey: false
});

productoSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('producto', productoSchema);
// usuarioSchema.methods.toJSON = function() {
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;

//     return userObject;
// }

// usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});


// module.exports = mongoose.model('Usuario', usuarioSchema);
