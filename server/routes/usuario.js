const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();

// Post - Login
app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            }); 
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            }); 
        }

        return res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
}); 

// GET - Usuarios
app.get('/usuario', function (req, res) {
    let desde = req.query.desde ||  0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({}, 'nombre email')
            // .skip(desde)
            // .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                
                Usuario.count((err, conteo) => {
                    res.json({
                      ok: true,
                      usuarios,
                      cantidad: conteo
                    })
                })
            })
});

// post - Usuarios
app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        "nombre": body.nombre,
        "email": body.email,
        "password": bcrypt.hashSync(body.password, 10),
        "role": body.role,
        "ci": Number(body.ci),
        "extension_ci": body.extension_ci
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 

        // usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

});

// put - Usuarios
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email']);

    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});

// delete - Usuarios (Borrar totalmente)
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            }); 
        }

        res.json({
            ok: true,
            message: "Usuario borrado correctamente"
        });
    })

});


module.exports = app;