const https = require('https');

// Realizar una petición HTTP GET
https.get('https://jsonplaceholder.typicode.com/posts/1', (res) => {
    let data = '';
    
    // Evento cuando recibimos datos
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    // Evento cuando termina la respuesta
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
}).on('error', (err) => {
    console.error('Error en la petición:', err.message);
});