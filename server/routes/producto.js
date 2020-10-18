const express = require('express');

const Producto = require('../models/producto');

const app = express();

// 
// Endpoint - Obtener Productos
//
app.get('/producto', function (req, res) {
    let desde = req.query.desde ||  0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find()
            // .skip(desde)
            // .limit(limite)
            .exec((err, productos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                
                Producto.count((err, conteo) => {
                    res.json({
                      ok: true,
                      productos,
                      cantidad: conteo
                    })
                })
            })
});

// 
// Endpoint - Insertar producto
//
app.post('/producto', function (req, res) {
    let body = req.body;

    let produto = new Producto({
        "codigo": body.codigo,
        "familia": body.familia,
        "linea": body.linea,
        "nombre": body.nombre,
        "precio": Number(body.precio)
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 

        res.json({
            ok: true,
            producto: productoDB
        })
    });
});

//
// Endpoint - Editar Producto
//
app.put('/producto/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body

    Producto.findByIdAndUpdate(id, body, {new: true, runValidators:true}, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    })
});

//
// Endpoint - Borrar Producto (Borrar Producto totalmente)
//
app.delete('/factura/:id', function (req, res) {
    let id = req.params.id;

    Producto.findByIdAndDelete(id, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (productoBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            }); 
        }

        res.json({
            ok: true,
            message: 'Producto borrado correctamente'
        });
    })

});


module.exports = app;