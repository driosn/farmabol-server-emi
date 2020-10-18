const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let extensionesValidas = {
    values: ['LP', 'SC', 'OR', 'PT', 'CB', 'BN', 'PA', 'TJ', 'CH'],
    message: '{VALUE} no es una extensión válida'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        require: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    ci: {
        type: Number,
        required: [true, 'El CI es obligatorio'],
    },
    extension_ci: {
        type: String,
        required: [true, 'La extension del CI es obligatoria'],
        enum: extensionesValidas
    },
}, {
    versionKey: false
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});


module.exports = mongoose.model('Usuario', usuarioSchema);
