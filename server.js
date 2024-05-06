const http = require('http');

const backendIP = '3.106.129.149'; 
const backendPort = 3030; 
const server = http.createServer((req, res) => {
    const options = {
        hostname: backendIP,
        port: backendPort,
        path: req.url,
        method: req.method,
        headers: req.headers
    };

    const backendReq = http.request(options, (backendRes) => {
        res.writeHead(backendRes.statusCode, backendRes.headers);
        backendRes.pipe(res);
    });
    req.pipe(backendReq);

    // Handle errors
    backendReq.on('error', (err) => {
        console.error('Backend request error:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
    });
});

const port = 8080;
server.listen(port, () => {
    console.log(`Middleware server running at http://localhost:${port}`);
});
