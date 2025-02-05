const User = require('../../models/user.js');
const Encryption = require('../../encryption.js');
const { Responses } = require("../../models/response.js");
const Session = require("../../controllers/session_controller.js");
const MySQLController = require("../../controllers/mysql_controller.js");
const StorageController = require("../../controllers/storage_controller.js");

const UserService = new class {
    #isUserExists(username, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                let connectionObj = result;
                connectionObj.query(`
                                SELECT * FROM short_video_sharing_app.users_credentials WHERE username = '${username}';
                                `, (err, result) => {
                    if (!err) {
                        callback(result.length != 0);
                    } else {
                        callback(false);
                    }
                    connectionObj.end();
                });
            } else {
                callback(false);
            }
        });
    }

    #$isUserExists(userid, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                let connectionObj = result;
                connectionObj.query(`
                                SELECT * FROM short_video_sharing_app.users_credentials WHERE userid = '${userid}';
                                `, (err, result) => {
                    if (!err) {
                        callback(result.length != 0);
                    } else {
                        callback(false);
                    }
                    connectionObj.end();
                });
            } else {
                callback(false);
            }
        });
    }

    #getNameByUserid(userid, callback) {
        this.#$isUserExists(userid, (status) => {
            if (status) {
                MySQLController.connect((status, result) => {
                    if (status) {
                        let connectionObj = result;
                        connectionObj.query(`SELECT name FROM short_video_sharing_app.users_basic_info WHERE userid = ${userid}`, (status, result) => {
                            if (status) {
                                callback(true, result[0]["name"]);
                            } else {
                                callback(false, new Responses().SOMETHING_WENT_WRONG);
                            }
                            connectionObj.end();
                        });
                    } else {
                        callback(false, new Responses().SOMETHING_WENT_WRONG);
                    }
                });
            } else {
                callback(false, new Responses().USER_DOES_NOT_EXISTS);
            }
        });
    }

    #getNameByUsername(username, callback) {
        this.#isUserExists(username, (status) => {
            if (status) {
                MySQLController.connect((status, result) => {
                    if (status) {
                        let connectionObj = result;
                        connectionObj.query(`SELECT name FROM short_video_sharing_app.users_basic_info WHERE username = ${username}`, (status, result) => {
                            if (status) {
                                callback(true, result[0]["name"]);
                            } else {
                                callback(false, new Responses().SOMETHING_WENT_WRONG);
                            }
                            connectionObj.end();
                        });
                    } else {
                        callback(false, new Responses().SOMETHING_WENT_WRONG);
                    }
                });
            } else {
                callback(false, new Responses().USER_DOES_NOT_EXISTS);
            }
        });
    }

    #getUsernameByUserid(userid, callback) {
        this.#$isUserExists(userid, (status) => {
            if (status) {
                MySQLController.connect((status, result) => {
                    if (status) {
                        let connectionObj = result;
                        connectionObj.query(`SELECT username FROM short_video_sharing_app.users_basic_info WHERE userid = ${userid}`, (status, result) => {
                            if (status) {
                                callback(true, result[0]["username"]);
                            } else {
                                callback(false, new Responses().SOMETHING_WENT_WRONG);
                            }
                            connectionObj.end();
                        });
                    } else {
                        callback(false, new Responses().SOMETHING_WENT_WRONG);
                    }
                });
            } else {
                callback(false, new Responses().USER_DOES_NOT_EXISTS);
            }
        });
    }

    login(username, password, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                const connectionObj = result;
                this.#isUserExists(username, (status) => {
                    if (status) {
                        connectionObj.query(`
                                    SELECT * FROM short_video_sharing_app.users_credentials WHERE username = '${username}';
                                    `, (err, result) => {
                            if (!err) {
                                if (result.length == 1 && bcrypt.compareSync(password, result[0]["password"])) {
                                    let userid = result[0]["userid"];
                                    connectionObj.query(`
                                                SELECT * FROM short_video_sharing_app.users_basic_info WHERE userid = '${userid}';
                                                `, (err, result) => {
                                        if (!err) {
                                            Session.setSessionData('user', new User(userid, result[0]["name"], result[0]["username"]), true);
                                            callback(new Responses().SUCCESS);
                                        } else {
                                            callback(new Responses().SOMETHING_WENT_WRONG);
                                        }
                                        connectionObj.end();
                                    });
                                } else {
                                    if (result.length != 1) {
                                        callback(new Responses().SOMETHING_WENT_WRONG);
                                    } else {
                                        callback(new Responses().WRONG_PASSWORD);
                                    }
                                    connectionObj.end();
                                }
                            } else {
                                callback(new Responses().SOMETHING_WENT_WRONG);
                                connectionObj.end();
                            }
                        });
                    } else {
                        callback(new Responses().USER_DOES_NOT_EXISTS);
                        connectionObj.end();
                    }
                });
            }
        });
    }

    secret_login(auth_string, callback) {
        Encryption.decrypt_string(auth_string, (status, data) => {
            if (status) {
                const auth = JSON.parse(data);
                if (auth['username'] && auth['password']) {
                    MySQLController.connect((status, result) => {
                        if (status) {
                            const connectionObj = result;
                            this.#isUserExists(auth['username'], (status) => {
                                if (status) {
                                    connectionObj.query(`
                                                SELECT * FROM short_video_sharing_app.users_credentials WHERE username = '${auth['username']}' AND password = '${auth['password']}';
                                                `, (err, result) => {
                                        if (!err) {
                                            if (result.length == 1) {
                                                let userid = result[0]["userid"];
                                                connectionObj.query(`
                                                            SELECT * FROM short_video_sharing_app.users_basic_info WHERE userid = '${userid}';
                                                            `, (err, result) => {
                                                    if (!err) {
                                                        Session.setSessionData('user', new User(userid, result[0]["name"], result[0]["username"]), true);
                                                        callback(new Responses().SUCCESS);
                                                    } else {
                                                        callback(new Responses().SOMETHING_WENT_WRONG);
                                                    }
                                                    connectionObj.end();
                                                });
                                            } else {
                                                callback(new Responses().SOMETHING_WENT_WRONG);
                                                connectionObj.end();
                                            }
                                        } else {
                                            callback(new Responses().SOMETHING_WENT_WRONG);
                                            connectionObj.end();
                                        }
                                    });
                                } else {
                                    callback(new Responses().USER_DOES_NOT_EXISTS);
                                    connectionObj.end();
                                }
                            });
                        } else {
                            callback(new Responses().SOMETHING_WENT_WRONG);
                        }
                    });
                } else {
                    callback('INVALID DATA');
                }
            } else {
                callback('INVALID DATA');
            }
        });
    }

    signup(name, username, password, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                const connectionObj = result;
                this.#isUserExists(username, (status) => {
                    if (!status) {
                        password = Encryption.$encrypt_string(password);
                        connectionObj.query(`
                                    INSERT INTO short_video_sharing_app.users_credentials (username, password) VALUES (
                                        '${username}',
                                        '${password}'
                                    );
                                    `, (err, result) => {
                            if (!err) {
                                connectionObj.query(`
                                            SELECT userid FROM short_video_sharing_app.users_credentials WHERE username = '${username}';
                                            `, (err, result) => {
                                    if (!err) {
                                        let userid = result[0]["userid"];
                                        connectionObj.query(`
                                                    INSERT INTO short_video_sharing_app.users_basic_info (name, username, userid) VALUES
                                                    (
                                                        '${name}',
                                                        '${username}',
                                                        '${userid}'
                                                    );
                                                    `, (err, result) => {
                                            if (!err) {
                                                StorageController.createStorage(userid);
                                                Encryption.encrypt_string(JSON.stringify({ 'username': username, 'password': password }), (status, data) => {
                                                    if (status) {
                                                        Session.setSessionData('user', new User(userid, name, username), true);
                                                        callback(data);
                                                    } else {
                                                        callback(new Responses().SOMETHING_WENT_WRONG);
                                                    }
                                                });
                                                connectionObj.end();
                                            } else {
                                                connectionObj.query(`
                                                    DELETE FROM short_video_sharing_app.users_credentials WHERE username = '${username}';
                                                    `, (err, result) => {
                                                    if (!err) { } else { }
                                                    callback(new Responses().SOMETHING_WENT_WRONG);
                                                    connectionObj.end();
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        connectionObj.query(`
                                            DELETE FROM short_video_sharing_app.users_credentials WHERE username = '${username}';
                                            `, (err, result) => {
                                            if (!err) { } else { }
                                            callback(new Responses().SOMETHING_WENT_WRONG);
                                            connectionObj.end();
                                        });
                                    }
                                });
                            } else {
                                callback(new Responses().SOMETHING_WENT_WRONG);
                                connectionObj.end();
                            }
                        });
                    } else {
                        callback(new Responses().USER_ALREADY_EXISTS);
                        connectionObj.end();
                    }
                });
            }
        });
    }

    search(name, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                const connectionObj = result;
                connectionObj.query(`SELECT * FROM short_video_sharing_app.users_basic_info WHERE name LIKE '%${name}%';`,
                    (err, result) => {
                        if (!err) {
                            let searchedUsers = [];
                            for (let i = 0; i < result.length; i++) {
                                searchedUsers.push({ 'name': result[i]["name"], 'username': result[i]["username"], 'userid': result[i]["userid"] });
                            }
                            callback(JSON.stringify(searchedUsers));
                            connectionObj.end();
                        } else {
                            callback(new Responses().SOMETHING_WENT_WRONG);
                            connectionObj.end();
                        }
                    }
                );
            } else {
                callback(new Responses().SOMETHING_WENT_WRONG);
            }
        });
    }

    follow(followerid, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                const connectionObj = result;
                this.#$isUserExists(followerid, (status) => {
                    if (status) {
                        connectionObj.query(`INSERT INTO short_video_sharing_app.users_followers (userid, follower_user_id) VALUES ('${Session.getSessionData('user').getUserId()}','${followerid}');`, (err, result) => {
                            if (!err) {
                                callback(new Responses().SUCCESS);
                            } else {
                                callback(new Responses().SOMETHING_WENT_WRONG);
                            }
                            connectionObj.end();
                        });
                    } else {
                        callback('FOLLOWER DOES NOT EXISTS');
                        connectionObj.end();
                    }
                });
            } else {
                callback(new Responses().SOMETHING_WENT_WRONG);
            }
        });
    }
}();

module.exports = UserService;