const http = require('http');
const PUERTO = 3000;

const servidor = http.createServer((req, res) => {
    // Establecer el encabezado de respuesta con tipo de contenido texto plano
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // Enviar el cuerpo de la respuesta
    res.end('<h1>¡Mi primer servidor con Node.js!<h1/>\n');
});

servidor.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}/`);
});