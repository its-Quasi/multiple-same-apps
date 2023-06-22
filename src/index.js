//Librerias
const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//Inicialización
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', 'hbs');
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Procenter API REST",
        version: '1.0.0',
      }, 
    },
    apis: ["index.js"],
  
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Variables Globales
app.use((req, res, next) => {
    next();
})


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/tareas'));
app.use(require('./routes/materias'));

//Contenido Publico
app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});



 

