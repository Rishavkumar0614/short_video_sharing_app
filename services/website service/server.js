const fs = require('fs');
const Response = require("../../models/response.js");

class Server {
    serve(requestData, callback) {
        if (requestData.peekUrl(true, true) == '') {
            if (fs.existsSync("./build/web/index.html")) {
                callback(new Response(200, 'text/html', `${fs.readFileSync("./build/web/index.html")}`));
            }
        }
        else if (fs.existsSync(`./build/web/${requestData.peekUrl(true, true)}`)) {
            callback(new Response(200, '', fs.readFileSync(`./build/web/${requestData.peekUrl(true, true)}`), requestData.peekUrl(true, true)));
        } else {
            callback(new Response(404, 'text/html', 'File Not Found'));
        }
    }
};

module.exports = Server;