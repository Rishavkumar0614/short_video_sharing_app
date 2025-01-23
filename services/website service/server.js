const fs = require('fs');
const Response = require("../../models/response.js");

class Server {
    serve(requestData, callback) {
        if (requestData.getUrl() == '') {
            if (fs.existsSync("./build/web/index.html")) {
                callback(new Response(200, 'text/html', `${fs.readFileSync("./build/web/index.html")}`));
            }
        }
        else if (fs.existsSync(`./build/web/${requestData.getUrl()}`)) {
            callback(new Response(200, Response.getContentTypeByFileName(requestData.getUrl()), fs.readFileSync(`./build/web/${requestData.getUrl()}`)));
        } else {
            callback(new Response(404, 'text/html', 'File Not Found'));
        }
    }
};

module.exports = Server;