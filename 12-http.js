const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.end('Welcom dear user to my server.')
    } else if (req.url === '/about'){
        res.end('<h1>Welcome, Here is short history.</h1>');
    }
    res.end(
        '<h1>Oops!</h1> <p>We can"t seem to find the page you are looing for</p> <a href="/">Back to home</a>'
    );
});

server.listen(5000);

