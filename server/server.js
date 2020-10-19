require('./config/config.js');

const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));
app.use(require('./routes/linea'));
app.use(require('./routes/producto'));
app.use(require('./routes/factura'));
app.use(require('./routes/pedido'));

app.get('/', function (req, res) {
  res.json('Hello World')
})
 
mongoose.connect(process.env.URLDB, 
    {useNewUrlParser: true, useCreateIndex: true},    
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos online');
    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT)
});