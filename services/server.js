const Response = require("../models/response.js");

class Server {
    #route(key) {
        let Server = undefined;
        const routeMap =
        {
            'user': './user service/server.js',
            'content': './content service/server.js',
        };
        if (routeMap[key]) {
            Server = require(routeMap[key]);
        }
        return Server;
    }

    serve(requestData, callback) {
        const Server = this.#route(requestData.popUrl(true));
        if (Server) {
            new Server().serve(requestData, callback);
        } else {
            callback(new Response(404, 'text/html', 'Service Not Found'));
        }
    }
};

module.exports = Server;