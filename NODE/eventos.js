const http = require('http');
const server = http.createServer();

// El servidor es un EventEmitter
server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hola desde el servidor!\n');
    console.log(`Petición recibida: ${req.method} ${req.url}`);
});

server.on('listening', () => {
    console.log('Servidor escuchando en el puerto 3000');
});

server.on('error', (err) => {
    console.error('Error en el servidor:', err.message);
});

// Iniciar el servidor en el puerto 3000
server.listen(3000);