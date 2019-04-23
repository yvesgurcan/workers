module.exports = (url) => {
    const {
        serverFolder,
    } = require('./constants')

    const serverPath = new RegExp(`^\/${serverFolder}`);
    if (url.match(serverPath)) {
        return false;
    }
    return true;
}