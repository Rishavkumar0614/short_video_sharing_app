const UserService = require("./user_service.js");
const Response = require("../../models/response.js");

class Server {
    serve(requestData, callback) {
        switch (requestData.getUrl()) {
            case 'upload':
                UserService.signup(requestData.getData()["name"], requestData.getData()["username"], requestData.getData()["password"], (response) => {
                    callback(new Response(200, 'text/plain', response));
                });
                break;

            default:
                callback(new Response(404, 'text/html', 'Service Not Found'));
        }
    }
};

module.exports = Server;