class User {
    #dob;
    #name;
    #userId;
    #gender;
    #userType;
    #username;
    #password_hash;

    constructor(userId, name, username, password_hash, gender, dob, userType) {
        this.#dob = dob;
        this.#name = name;
        this.#gender = gender;
        this.#userId = userId;
        this.#username = username;
        this.#userType = userType;
        this.#password_hash = password_hash;
    }

    getDob() {
        return this.#dob;
    }

    setDob(dob) {
        if (dob.getDay() != 0 && dob.getMonth() != 0 && dob.getYear() != 0) {
            this.#dob = dob;
        }
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        if (name != '') {
            this.#name = name;
        }
    }

    getUserId() {
        return this.#userId;
    }

    getGender() {
        return this.#gender;
    }

    setGender(gender) {
        if (gender != null) {
            this.#gender = gender;
        }
    }

    getUserType() {
        return this.#userType;
    }

    setUserType(userType) {
        if (userType != null) {
            this.#userType = userType;
        }
    }

    getUsername() {
        return this.#username;
    }

    setUsername(username) {
        if (username != '') {
            this.#username = username;
        }
    }

    getPasswordHash() {
        return this.#password_hash;
    }
};

module.exports = user;