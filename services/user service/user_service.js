const bcrypt = require('bcrypt');
const { hash_string } = require('../../commons.js');
const MySQLController = require("../../controllers/mysql_controller.js");
const StorageController = require("../../controllers/storage_controller.js");

class UserService {
    static isUserExists(username, callback) {
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

    static $isUserExists(userid, callback) {
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

    static login(username, password, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                const connectionObj = result;
                UserService.isUserExists(username, (status) => {
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
                                            callback(JSON.stringify({ 'name': result[0]["name"], 'username': result[0]["username"], 'userid': userid }));
                                            connectionObj.end();
                                        } else {
                                            callback('SOMETHING WENT WRONG');
                                            connectionObj.end();
                                        }
                                    });
                                } else {
                                    if (result.length != 1) {
                                        callback('SOMETHING WENT WRONG');
                                    } else {
                                        callback('WRONG PASSWORD');
                                    }
                                    connectionObj.end();
                                }
                            } else {
                                callback('SOMETHING WENT WRONG');
                                connectionObj.end();
                            }
                        });
                    } else {
                        callback('USER DOES NOT EXISTS');
                        connectionObj.end();
                    }
                });
            }
        });
    }

    static signup(name, username, password, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                const connectionObj = result;
                UserService.isUserExists(username, (status) => {
                    if (!status) {
                        connectionObj.query(`
                                    INSERT INTO short_video_sharing_app.users_credentials (username, password) VALUES (
                                        '${username}',
                                        '${hash_string(password)}'
                                    );
                                    `, (err, result) => {
                            console.log(err);
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
                                                callback(JSON.stringify({ 'name': name, 'username': username, 'userid': userid }));
                                                connectionObj.end();
                                            } else {
                                                connectionObj.query(`
                                                    DELETE FROM short_video_sharing_app.users_credentials WHERE username = '${username}';
                                                    `, (err, result) => {
                                                    if (!err) {
                                                        callback('SOMETHING WENT WRONG');
                                                    } else {
                                                        callback('SOMETHING WENT WRONG');
                                                    }
                                                    connectionObj.end();
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        connectionObj.query(`
                                            DELETE FROM short_video_sharing_app.users_credentials WHERE username = '${username}';
                                            `, (err, result) => {
                                            if (!err) {
                                                callback('SOMETHING WENT WRONG');
                                            } else {
                                                callback('SOMETHING WENT WRONG');
                                            }
                                            connectionObj.end();
                                        });
                                    }
                                });
                            } else {
                                callback('SOMETHING WENT WRONG');
                                connectionObj.end();
                            }
                        });
                    } else {
                        callback('USER ALREADY EXISTS');
                        connectionObj.end();
                    }
                });
            }
        });
    }

    static search(name, callback) {
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
                            callback('SOMETHING WENT WRONG');
                            connectionObj.end();
                        }
                    }
                );
            } else {
                callback('SOMETHING WENT WRONG');
            }
        });
    }

    static follow(userid, followerid, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                const connectionObj = result;
                UserService.$isUserExists(userid, (status) => {
                    if (status) {
                        UserService.$isUserExists(followerid, (status) => {
                            if (status) {
                                connectionObj.query(`INSERT INTO short_video_sharing_app.users_followers (userid, follower_user_id) VALUES ('${userid}','${followerid}');`, (err, result) => {
                                    if (!err) {
                                        callback('SUCCESS');
                                        connectionObj.end();
                                    } else {
                                        callback('SOMETHING WENT WRONG');
                                        connectionObj.end();
                                    }
                                });
                            } else {
                                callback('FOLLOWER DOES NOT EXISTS');
                                connectionObj.end();
                            }
                        });
                    } else {
                        callback('USER DOES NOT EXISTS');
                        connectionObj.end();
                    }
                });
            } else {
                callback('SOMETHING WENT WRONG');
            }
        });
    }
};

module.exports = UserService;