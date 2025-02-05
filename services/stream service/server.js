const Response = require("../../models/response.js");
const StreamService = require("./stream_service.js");

/*
    Code Review:
    Review #1: 24/01/2025
    Review #2: 25/01/2025
*/

class Server {
    serve(requestData, callback) {
        if (!(requestData.getField("userid") && requestData.getField("contentid"))) {
            callback(new Response(400, 'text/plain', 'Invalid Request'));
        } else {
            StreamService.stream(requestData.getField("userid"), requestData.getField("contentid"), (response) => {
                callback(new Response(200, 'text/plain', response));
            });
        }
    }
};

module.exports = Server;