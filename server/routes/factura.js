const express = require('express')

const Factura = require('../models/factura');

const app = express();

// GET - facturas
app.get('/factura', function (req, res) {
    let desde = req.query.desde ||  0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Factura.find({estado: true})
            // .skip(desde)
            // .limit(limite)
            .exec((err, facturas) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                
                Factura.count({estado: true}, (err, conteo) => {
                    res.json({
                      ok: true,
                      facturas,
                      cantidad: conteo
                    })
                })
            })
});

// 
// Endpoint - Crear Factura
//
app.post('/factura', function (req, res) {
    let body = req.body;

    let factura = new Factura({
        "nombre_usr": body.nombre_usr,
        "nit": body.nit,
        "fecha_fac": Number(body.fecha_fac),
        "total": Number(body.total),
        "detalle": body.detalle
    });

    factura.save((err, facturaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 

        res.json({
            ok: true,
            factura: facturaDB
        })
    });
});

//
// Endpoint - Editar Factura
//
app.put('/factura/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body

    Factura.findByIdAndUpdate(id, body, {new: true, runValidators:true}, (err, facturaDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            factura: facturaDB
        });
    })
});

//
// Endpoint - Borrar Factura (Cambiar Estado)
//
app.delete('/factura/:id', function (req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    Factura.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, facturaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (facturaBorrada === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Factura no encontrada'
                }
            }); 
        }

        res.json({
            ok: true,
            factura: facturaBorrada
        });
    })

});


module.exports = app;