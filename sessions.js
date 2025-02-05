class SessionKeys {
    USER = 'USER';
};

const Session = new class {
    #flag;
    #sessionData;

    constructor() {
        this.#flag = false;
        this.#sessionData = null;
    }

    init(req) {
        if (this.#sessionData == null)
            this.#sessionData = req.session;
    }

    end() { this.#flag = false; }
    start() { this.#flag = true; }

    getSessionData(key) {
        return this.#sessionData[key];
    }

    setSessionData(key, value, create = false) {
        if (this.#flag && (create || this.#sessionData[key])) {
            this.#sessionData[key] = value;
        }
    }
}();

module.exports = Session;