const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
//const cors = require('cors');
const app = express();
const routes = require('./src/routes');
require('./src/data');
const db = mongoose.connection;

app.set('PORT', process.env.PORT || 3500);

app.use(bodyParse.urlencoded({extended:false}));
app.use(express.json());
// SOLO EN MODO DEV, EN PRODUCCIÓN BORRAR ESTO!!
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use('/', routes);

db.once('open', ()=>{
    console.log('succesull connection');
    app.listen(app.get('PORT'), ()=>{
        console.log("server on an localhost:"+app.get('PORT')+"/");
    });
});

