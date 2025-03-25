const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para validar el correo y registrar la entrada del usuario
app.post("/submit-form", (req, res) => {
  const { name, cedula, email, phone } = req.body;

  if (!name || !cedula || !email || !phone) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Verificar si el correo ya ha sido utilizado en la tabla users
  const checkQuery = "SELECT email FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error("Error al verificar el correo en la base de datos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Este correo ya ha sido utilizado" });
    }

    // Si el correo no ha sido utilizado, registrar el usuario y permitir acceso
    const insertQuery = `
      INSERT INTO users (name, cedula, email, phone)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertQuery, [name, cedula, email, phone], (err, result) => {
      if (err) {
        console.error("Error al insertar en la base de datos:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      // Redirigir al video si la inserción es exitosa
      res
        .status(200)
        .json({ redirect: "https://www.youtube.com/watch?v=g8fbiFbT0X8" });
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
