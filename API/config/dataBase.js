const mysql=require('mysql2');
require('dotenv').config();


const dataBaseInfo = { 
    host:process.env.HOST,
    user:process.env.DB_USER,
    database: process.env.DB,
    password: process.env.PASS,
    
};

const dbConnection = mysql.createConnection(dataBaseInfo);

dbConnection.connect((error)=>{
    if(error){
        console.log(error)
    } else {
        console.log('Conexión con DB MySQL exitosa')
    }
});

module.exports=dbConnection;
