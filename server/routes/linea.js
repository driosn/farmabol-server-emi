const express = require('express');

const Linea = require('../models/linea');

const app = express();

//
// Endpoint - Listar Lineas
//
app.get('/linea', (err, res) => {
    Linea.find({})
        .exec((err, lineas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Linea.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    lineas,
                    cantidad: conteo
                })                
            })
        })
});

//
// Endpoint - Crear Linea
//
app.post('/linea', function (req, res) {
    let body = req.body;

    let linea = new Linea({
        "codigo": body.codigo,
        "descripcion": body.descripcion
    });;

    linea.save((err, lineaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            linea: lineaDB
        })
    })
});

//
// Endpoint - Editar Linea
//
app.put('/linea/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;

    Linea.findByIdAndUpdate(id, body, {new: true}, (err, lineaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (lineaBorrada === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Linea no encontrada'
                }
            })
        }

        res.json({
            ok: true,
            linea: lineaDB
        });
    });
})

//
// Endpoint - Borrar Linea (Borrar de la DB totalmente)
//
app.delete('/linea/:id', function (req, res) {
    let id = req.params.id;
    
    Linea.findByIdAndDelete(id, (err, lineaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    
        if (lineaBorrada === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Linea no encontrada'
                }
            })
        }
    
        res.json({
            ok: true,
            message: 'Linea borrada correctamente'
        });
    })
})

module.exports = app;
