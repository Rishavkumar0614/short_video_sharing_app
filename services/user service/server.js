const UserService = require("./user_service.js");
const Response = require("../../models/response.js");

class Server {
    serve(requestData, callback) {
        switch (requestData.getUrl()) {
            case 'signup':
                UserService.signup(requestData.getData()["name"], requestData.getData()["username"], requestData.getData()["password"], (response) => {
                    callback(new Response(200, 'text/plain', response));
                });
                break;

            case 'login':
                UserService.login(requestData.getData()["username"], requestData.getData()["password"], (response) => {
                    callback(new Response(200, 'text/plain', response));
                });
                break;

            case 'search':
                UserService.search(requestData.getData()["name"], (response) => {
                    callback(new Response(200, 'text/plain', response));
                });
                break;

            case 'follow':
                UserService.follow(requestData.getData()["userid"], requestData.getData()["followerid"], (response) => {
                    callback(new Response(200, 'text/plain', response));
                });
                break;

            default:
                callback(new Response(404, 'text/html', 'Service Not Found'));
        }
    }
};

module.exports = Server;