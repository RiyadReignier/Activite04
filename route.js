const http = require('http');
const url = require('url');
const version = "v1";

module.exports = http.createServer((req, res) => {
    var actions = require('./controller.js');
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == `/api/${version}/stringmod/firstIndexSequence` && req.method === 'GET'){
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        actions.firstIndexSequence(req, res);
    } else if (reqUrl.pathname == `/api/${version}/stringmod/longestSequenceIndex` && req.method === 'GET'){
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        actions.longestSequenceIndex(req, res);
    } else {
        actions.invalidUrl(req, res);
    }
})