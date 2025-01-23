const HTTPServer = require('http');
const $Server = require("./$server.js");
const RequestData = require("./models/request_data.js");

class Server extends $Server {
    #requestData;
    #requestTable;

    constructor() {
        this.#requestData = new RequestData();
        this.#requestTable =
        {
            'assets': './assets/server.js',
            'services': './services/server.js',
        };
    }

    #setUpCORSPolicy(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    }

    // #prepareResponse(callback) {
    //     let Server;
    //     if (this.#requestTable[this.#requestData.getUrl(true)[0]] != undefined) {
    //         Server = require(this.#requestTable[this.#requestData.shiftUrl()]);
    //     } else {
    //         Server = require("./services/website service/server.js");
    //     }
    //     new Server().serve(this.#requestData, callback);
    // }

    // serve(req, res) {
    //     this.#setUpCORSPolicy(res);
    //     if (req.method === 'OPTIONS') {
    //         res.writeHead(204, { 'Content-Type': 'text/plain' });
    //         res.end();
    //     } else {
    //         this.#requestData.extractData(req, () => {
    //             this.#prepareResponse((response) => {
    //                 res.writeHead(response.getStatusCode(), { 'Content-Type': response.getContentType() });
    //                 res.end(response.getContent());
    //             });
    //         });
    //     }
    // }
}

HTTPServer.createServer((req, res) => { new Server().serve(req, res); }).listen(4000, '127.0.0.1');