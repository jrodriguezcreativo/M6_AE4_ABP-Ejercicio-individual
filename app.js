// Importar módulos
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const proyectos = require('./data/projects');

// Crear servidor Express
const app = express();

// Puerto del servidor
const PORT = 3000;

// Configurar carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Servir CSS, imágenes, JS

// Configurar Handlebars como motor de vistas
app.set('view engine', 'hbs');

// Rutas de vistas
app.set('views', path.join(__dirname, 'views'));

// Registrar carpeta de parciales
hbs.registerPartials(path.join(__dirname, 'views', 'partials'), function (err) {
  if (err) console.error('Error cargando parciales:', err);
});

// Helper para mostrar el año actual
hbs.registerHelper('currentYear', () => new Date().getFullYear());

// Ruta Home
app.get('/', (req, res) => {
  res.render('home', { 
    nombre: 'Jorge Rodriguez',
    descripcion: 'Combino diseño y desarrollo para crear interfaces funcionales, atractivas y pensadas en el usuario. Trabajo con Figma, HTML, CSS y JavaScript para llevar ideas a soluciones reales que se ven y funcionan bien.',
    proyectos
  });
});


// Ruta About
app.get('/about', (req, res) => {
  res.render('about');
});

// Ruta Projects
app.get('/projects', (req, res) => {
  res.render('projects', { proyectos });
});


// Página 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
