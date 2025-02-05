const express = require('express');
const Session = require('./sessions.js');
const session = require('express-session');
const Encryption = require('./encryption.js');
const RequestData = require("./models/request_data.js");
const MySQLController = require('./controllers/mysql_controller.js');

class HTTPServer {
    #requestData;

    constructor() {
        MySQLController.initialize();
        this.#requestData = new RequestData();
    }

    #setUpCORSPolicy(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    }

    #route(key) {
        const routeMap = { 'services': './services/server.js', };
        return require((routeMap[key] != undefined) ? routeMap[key] : './services/website service/server.js');
    }

    #prepareResponse(callback) {
        try {
            const Server = this.#route(this.#requestData.popUrl(true));
            new Server().serve(this.#requestData, callback);
        } catch (e) {
            callback(false);
        }
    }

    serve(req, res) {
        Session.init(req);
        this.#setUpCORSPolicy(res);
        if (req.method === 'OPTIONS') {
            res.writeHead(204, { 'Content-Type': 'text/plain' });
            res.end();
        } else {
            this.#requestData.extractData(req, (status) => {
                if (status === false) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server error');
                    return;
                }
                this.#prepareResponse((response) => {
                    if (response === false) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Server error');
                        return;
                    }
                    res.writeHead(response.getStatusCode(), { 'Content-Type': response.getContentType() });
                    res.end(response.getContent());
                });
            });
        }
    }
}

const app = express();

app.use(session({
    secret: Encryption.$encrypt_string('Kumar@Rishav14'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res) => {
    new HTTPServer().serve(req, res);
});

app.listen(4000, '127.0.0.1', () => {
    console.log('Server is running on http://127.0.0.1:4000');
});