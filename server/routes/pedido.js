const express = require('express')

const Pedido = require('../models/pedido');

const app = express();

//
// Endpoint - Obtener Pedidos
//
app.get('/pedido', function (req, res) {
    let desde = req.query.desde ||  0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Pedido.find()
            // .skip(desde)
            // .limit(limite)
            .exec((err, pedidos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                
                Pedido.count({}, (err, conteo) => {
                    res.json({
                      ok: true,
                      pedidos,
                      cantidad: conteo
                    })
                })
            })
});

//
// Endpoint - Crear Pedido
//
app.post('/pedido', function (req, res) {
    let body = req.body;

    let pedido = new Pedido({
        "nombre_usr": body.nombre_usr,
        "id_usr": body.id_usr,
        "fecha_pedido": body.fecha_pedido,
        "nit": body.nit,
        "detalle": body.detalle,
        "total": body.total
    });

    pedido.save((err, pedidoDB) =>  {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 

        res.json({
            ok: true,
            pedido: pedidoDB
        })
    });
});

//
// Endpoint - Editar Pedido
//
app.put('/pedido/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body

    Pedido.findByIdAndUpdate(id, body, {new: true}, (err, pedidoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (pedidoDB === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Pedido no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            pedido: pedidoDB
        });
    })
});

//
// Endpoint - Borrar Pedido (Borrado DB)
//
app.delete('/pedido/:id', function (req, res) {
    let id = req.params.id;

    Pedido.findByIdAndDelete(id, (err, pedidoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (pedidoBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Pedido no encontrado'
                }
            }); 
        }

        res.json({
            ok: true,
            pedido: pedidoBorrado
        });
    })
});


module.exports = app;