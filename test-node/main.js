const http = require('http')

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write('<h2>Can you hear me, help me they are holding me hostage</h2>'); //this is a joke heheheha, please dont come searching for me
    response.end();
});

server.listen(3000);