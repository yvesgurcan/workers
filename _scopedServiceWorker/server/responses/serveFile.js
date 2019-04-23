module.exports = (req, res, file) => {
    const {
        method,
        url,
    } = req;
    const statusCode = 200;
    console.error(`${method} ${url} ${statusCode}`);

    if (url.includes('.png')) {
        res.writeHead(statusCode, { 'Content-Type': 'image/png' });
    } else if (url.includes('.js')) {
        res.writeHead(statusCode, { 'Content-Type': 'text/javascript' });
    } else {
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    }
    res.write(file);
    res.end();
}