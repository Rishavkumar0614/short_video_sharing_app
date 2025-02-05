const UserService = require("./user_service.js");
const { Response } = require("../../models/response.js");

class Server {
    serve(requestData, callback) {
        switch (requestData.peekUrl(true, true)) {
            case 'signup':
                if (!(requestData.incomingData.checkFields(["name", "username", "password"]))) {
                    callback(new Response(400, 'text/plain', 'Invalid Request'));
                } else {
                    UserService.signup(requestData.incomingData.getField("name"), requestData.incomingData.getField("username"), requestData.incomingData.getField("password"), (response) => {
                        callback(new Response(200, 'text/plain', response));
                    });
                }
                break;

            case 'login':
                if (!(requestData.incomingData.checkFields(["username", "password"]))) {
                    callback(new Response(400, 'text/plain', 'Invalid Request'));
                } else {
                    UserService.login(requestData.incomingData.getField("username"), requestData.incomingData.getField("password"), (response) => {
                        callback(new Response(200, 'text/plain', response));
                    });
                }
                break;

            case 'secretLogin':
                if (!(requestData.incomingData.checkFields(["auth_key"]))) {
                    callback(new Response(400, 'text/plain', 'Invalid Request'));
                } else {
                    UserService.secret_login(requestData.incomingData.getField("auth_key"), (response) => {
                        callback(new Response(200, 'text/plain', response));
                    });
                }
                break;

            case 'search':
                if (!(requestData.incomingData.checkFields(["name"]))) {
                    callback(new Response(400, 'text/plain', 'Invalid Request'));
                } else {
                    UserService.search(requestData.incomingData.getField("name"), (response) => {
                        callback(new Response(200, 'text/plain', response));
                    });
                }
                break;

            case 'follow':
                if (!(requestData.incomingData.checkFields(["userid", "followerid"]))) {
                    callback(new Response(400, 'text/plain', 'Invalid Request'));
                } else {
                    UserService.follow(requestData.incomingData.getField("userid"), requestData.incomingData.getField("followerid"), (response) => {
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