const Response = require("../models/response.js");

class Server {
    #requestTable;

    constructor() {
        this.#requestTable =
        {
            'user': './user service/server.js',
            'content': './content service/server.js',
        };
    }

    serve(requestData, callback) {
        let Server;
        if (this.#requestTable[requestData.getUrl(true)[0]] != undefined) {
            Server = require(this.#requestTable[requestData.shiftUrl()]);
            new Server().serve(requestData, callback);
        } else {
            callback(new Response(404, 'text/html', 'Service Not Found'));
        }
    }
};

module.exports = Server;