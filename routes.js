const fs   = require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;

if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Enter page!</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
    res.write('</html>');
    return res.end();
}

if(url === '/message' && method === 'POST'){
    const body = [];

    req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
    });

   return req.on('end', () => {
        const parseBody = Buffer.concat(body).toString();
        const message   = parseBody.split('=')[1];
        console.log(parseBody);
        fs.writeFile('message.txt', message, (err) => {
            if(!err){
                res.statusCode = 302;
                res.setHeader('Location', '/'); 
                return res.end();
            }
            throw err;
        });
    });
}

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Enter page!</title></head>');
    res.write('<body><h1>Welcome to our ATT website..!</body>');
    res.write('</html>');
    res.end();
};

exports.handler = requestHandler;

