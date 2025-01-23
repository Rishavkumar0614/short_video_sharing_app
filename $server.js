class $Server {
    constructor() {
        if (new.target === $Server) {
            throw new Error("Cannot create '$Server' instances directly");
        }
    }

    #prepareResponse(callback) {
        throw new Error("prepareResponse method must be implemented.");
    }

    serve(req, res) {
        console.log('hi');
        throw new Error("serve method must be implemented.");
    }

};

module.exports = $Server;