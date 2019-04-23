const packageData = require('../package.json');
const { createServer } = require('http');
const { readFileSync } = require('fs');
const authorizeFetchFile = require('./authorizeFetchFile');
const { clientEntryPoint, clientSourceFolder } = require('./constants');
const {
    serveFile,
    internalServerError,
    notFound,
} = require('./responses');

const host = 'localhost';
const port = 3000;

const server = createServer((req, res) => {
    try {
        const { url: originalUrl } = req;

        const url = `${clientSourceFolder}${originalUrl}`;

        if (!authorizeFetchFile(url)) {
            return notFound(req, res, 'Unauthorized.');
        }

        let path = url;
        if (url === 'client/') path = 'client/index.html';
        if (url === 'client/images') path = 'client/images/index.html';
        const clientPath = `${clientEntryPoint}/${path}`;

        let file;
        try {
            file = readFileSync(clientPath);
        } catch (exception) {
            return notFound(req, res, exception);
        }
        return serveFile(req, res, file);
    } catch (exception) {
        return internalServerError(req, res, exception);
    }
});

module.exports = () => {
    server.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}/`);
    });
};