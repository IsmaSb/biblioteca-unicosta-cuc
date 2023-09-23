const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/prestamo', (req, res) => {
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
    return res.redirect('/error.html'); // Redirige a la página de error si falta algún campo
  }

  const contenido = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${año}`;

  const archivoNombre = path.join(__dirname, 'data', `id_${id}.txt`);

  fs.writeFile(archivoNombre, contenido, (err) => {
    if (err) {
      return res.status(500).send('Error interno del servidor');
    }
    res.download(archivoNombre, (err) => {
      if (err) {

        console.error(err);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
