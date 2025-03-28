require("dotenv").config(); // Cargar las variables de entorno desde .env

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // '37.170.139.32'
  port: process.env.DB_PORT, // '3306'
  user: process.env.DB_USER, // 'anderso1_bruderuser'
  password: process.env.DB_PASS, // 'root1234bruder@'
  database: process.env.DB_NAME, // 'anderso1_bruder'
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión: " + err.stack);
    return;
  }
  console.log("Conectado a la base de datos con id " + connection.threadId);
});

module.exports = connection;
