////////// contient le code du serveur Node //////////

//importations
const http = require('http');
const app = require('./app');

//renvoie un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) { //si port n'est pas un nombre,
    return val; //renvoie valeur
  }
  if (port >= 0) { //si port >= 0,
    return port; //renvoie le port
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000'); //permet de se servir de tous les ports
app.set('port', port);

//recherche les différentes erreurs et les gère
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES': //si permission refusée
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE': //si port déjà utilisé
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);