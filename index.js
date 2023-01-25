'use strict'
//importem llibreria dotenv i carreguem la configuració de l'arxiu .env
const config = require('dotenv').config();
//importem llibreria express
const express = require('express');
//importem llibreria cors
const cors = require('cors');
//importem llibreria Morgan
const morgan = require('morgan');
//importem llibreria express-fileupload
const fileUpload = require('express-fileupload');

//instanciem express cap a l'objecte app
const app = express();


//middlewares
//implementem express-fileupload
app.use(fileUpload());
//implementem cors
app.use(cors());
//implementem morgan en mode desenvolupament
app.use(morgan('dev'));
//per passar de json en el body a objectes javaScript
app.use(express.json());
//per passar de json url a objectes javaScript
app.use(express.urlencoded({extended:false}));
//importar l'arxiu de rutes de product.routes
const users = require('./routes/user.routes');

//passem la instància app
users.userRoutes(app);

//executem el servidor per escoltar en el puerto 3000 i la ip localhost---->127.0.0.1
app.listen(config.parsed.SERVER_PORT,'localhost',()=>{
    console.log('Server listening on port %s',config.parsed.SERVER_PORT);
})