const Response = require("../../models/response.js");
const ContentService = require("./content_service.js");

/*
    Code Review:
    Review #1: 24/01/2025
    Review #2: 25/01/2025
*/

class Server {
    serve(requestData, callback) {
        switch (requestData.peekUrl(true, true)) {
            case 'upload':
                if (!(requestData.getField("userid") && requestData.getField("caption") && requestData.getFiles().length > 0)) {
                    callback(new Response(400, 'text/plain', 'Invalid Request'));
                } else {
                    ContentService.upload(requestData.getField("userid"), requestData.getFiles()[0]['filename'], requestData.getFiles()[0]['filepath'], requestData.getField("caption"), (response) => {
                        callback(new Response(200, 'text/plain', response));
                    });
                }
                break;

            case 'fetch':
                if (!(requestData.getField("userid") && requestData.getField("contentid"))) {
                    callback(new Response(400, 'text/plain', 'Invalid Request'));
                } else {
                    ContentService.fetch(requestData.getField("userid"), requestData.getField("contentid"), (response) => {
                        callback(new Response(200, 'text/plain', response));
                    });
                }
                break;

            default:
                callback(new Response(404, 'text/html', 'Service Not Found'));
        }
    }
};

module.exports = Server;