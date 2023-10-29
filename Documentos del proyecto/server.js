//// en server.js
const express = require('express');
const bodyParser = require('body-parser');

const api = require('./api');

const port = 3000;
const app = express();

app.listen(port, function () {
    console.log('escuchando peticiones en el port ' + port);
});

// Analiza el texto como datos codificados en la URL para usarlos

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//define la ruta
app.use('/api', api);