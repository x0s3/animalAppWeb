const express = require('express');
const path = require('path');
const webpack = require('webpack');
const logger = require('../build/lib/logger');
const webpackConfig = require('../build/webpack.config');
const project = require('../project.config');
const compress = require('compression');
const bodyParser = require("body-parser");
const Noticias = require('./Server JS/noticias').default;
const Animales = require('./Server JS/animales').default;

const app = express();
app.use(compress());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({
  limit:'5mb',extended: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************************************
 * APIS NOTICIAS                    *
 ************************************/
app.post('/noticias/crearNoticia', async (req, res) => {
  const x = new Noticias(req.body.titulo, req.body.local, req.body.contenido, req.body.imagen).crearNoticia();
  if (await x == true) res.json({ response: 200 });
  else res.json({ response: 0 });
});

app.put('/noticias/modificarNoticia/:id', async (req, res) => {

});

app.delete('/noticias/eliminarNoticia/:id', async (req, res) => {
  const x = new Noticias().eliminarNoticia(req.params.id);
  if (await x == true) res.json({ response: 200 });
  else res.json({ response: 0 });
});

app.get('/noticias/noticias', async (req, res) => {
  const x = new Noticias().getNoticias();
  res.json(await x);
});
/*****************************************************/
/************************************
 * APIS ANIMALES                    *
 ************************************/
app.post('/animales/crearAnimal', async (req, res) => {
  const x = new Animales(req.body.nombre, req.body.raza, parseInt(req.body.edad), req.body.informacion, req.body.local, req.body.imagen).crearAnimal();
  if (await x == true) res.json({ response: 200 });
  else res.json({ response: 0 });
});

app.delete('/animales/eliminarAnimal/:id', async (req, res) => {
  const x = new Animales().eliminarAnimal(req.params.id);
  if (await x == true) res.json({ response: 200 });
  else res.json({ response: 0 });
});

app.get('/animales/animales', async (req, res) => {
  const x = new Animales().getAnimales();
  res.json(await x);
});
/*****************************************************/

if (project.env === 'development') {
  const compiler = webpack(webpackConfig);

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(project.basePath, project.srcDir),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: 'normal',
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }));


  app.use(express.static(path.resolve(project.basePath, 'public')));

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    })
  })
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  );
  app.use(express.static(path.resolve(project.basePath, project.outDir)));
}

module.exports = app;
