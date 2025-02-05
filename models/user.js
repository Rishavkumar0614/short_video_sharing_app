class User {
    #name;
    #userId;
    #username;

    constructor(userId, name, username) {
        this.#name = name;
        this.#userId = userId;
        this.#username = username;
    }

    getName() {
        return this.#name;
    }

    getUserId() {
        return this.#userId;
    }

    getUsername() {
        return this.#username;
    }
};

module.exports = User;