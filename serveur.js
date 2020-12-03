const http = require('http');
const hostname = '127.0.0.1';
const port = 2357;
const server = require('./route.js');
server.listen(port,hostname,() =>{
    console.log('Serveur en execution sur http://'+ hostname + ':' + port + '/');
});