require('dotenv').config();
const express=require('express');
const server=express();
const puerto=process.env.PORT; 
const cors=require('cors')
require('./config/dataBase');
var bodyParser = require('body-parser');



const routes=require('./routes/routes');

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({extended:true}));
server.use('',routes);
server.use('/public', express.static('./imagenes')) 
server.use(bodyParser.json());





server.listen(puerto,()=>{
    console.log(`Conectado a puerto ${puerto}`)
})