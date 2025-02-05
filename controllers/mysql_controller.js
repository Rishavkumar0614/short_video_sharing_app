const mysql = require('mysql');

const MySQLController = new class {
    #username;
    #password;

    initialize() { }

    Query = new class {
        SELECT() {
            // TODO
        }
        INSERT() {
            // TODO
        }
        UPDATE() {
            // TODO
        }
        DELETE() {
            // TODO
        }
        CREATE_DATABASE() {
            // TODO
        }
        ALTER() {
            // TODO
        }
        DROP() {
            // TODO
        }
        RENAME() {
            // TODO
        }
        TRUNCATE() {
            // TODO
        }
        GRANT() {
            // TODO
        }
        REVOKE() {
            // TODO
        }
    }();

    constructor() {
        this.connect((status, result) => {
            if (status) {
                let connectionObj = result;
                connectionObj.query(`
                    CREATE USER IF NOT EXISTS 'short_video_sharing_app_user'@'localhost' IDENTIFIED BY 'Rishav@kumar14';
                    CREATE DATABASE IF NOT EXISTS short_video_sharing_app;
                    GRANT ALL PRIVILEGES ON short_video_sharing_app.* TO 'short_video_sharing_app_user'@'localhost';
                    FLUSH PRIVILEGES;
                    `, (err, result) => {
                    if (err) {
                        this.#username = this.#password = null;
                    } else {
                        this.#username = 'short_video_sharing_app';
                        this.#password = 'Rishav@kumar14';
                        connectionObj.end();
                        this.connect((status, result) => {
                            if (status) {
                                let connectionObj = result;
                                connectionObj.query(`
                                    USE short_video_sharing_app;
                                    CREATE TABLE IF NOT EXISTS users_credentials (
                                        userid INT AUTO_INCREMENT,
                                        username VARCHAR(255),
                                        PRIMARY KEY (userid, username),
                                        password VARCHAR(255) NOT NULL
                                    );
                                    CREATE TABLE IF NOT EXISTS users_basic_info (
                                        userid INT,
                                        username VARCHAR(255),
                                        PRIMARY KEY (userid, username),
                                        FOREIGN KEY (userid, username) REFERENCES users_credentials(userid, username),
                                        name varchar(255) NOT NULL
                                    );
                                    CREATE TABLE IF NOT EXISTS users_followers (
                                        userid INT,
                                        follower_user_id INT,
                                        PRIMARY KEY (userid, follower_user_id),
                                        FOREIGN KEY (userid) REFERENCES users_credentials(userid),
                                        FOREIGN KEY (follower_user_id) REFERENCES users_credentials(userid),
                                        name varchar(255) NOT NULL
                                    );
                                    CREATE TABLE IF NOT EXISTS contents (
                                        userid INT,
                                        contentid INT,
                                        PRIMARY KEY (userid, contentid),
                                        FOREIGN KEY (userid) REFERENCES users_credentials(userid),
                                        caption varchar(255) NOT NULL
                                    );
                                    `, (err, result) => {
                                    if (err) {
                                        this.#username = this.#password = null;
                                    }
                                    connectionObj.end();
                                });
                            } else {
                                this.#username = this.#password = null;
                            }
                        });
                    }
                });
            } else {
                this.#username = this.#password = null;
            }
        }, 'root', 'Rishav@kumar14');
    }

    connect(callback, user = this.#username, password = this.#password, hostname = 'localhost', port = 3306) {
        try {
            const connection = mysql.createConnection({
                port: port,
                user: user,
                host: hostname,
                password: password,
                multipleStatements: true,
            });
            connection.connect((err) => {
                if (err) {
                    callback(false, err);
                } else {
                    callback(true, connection);
                }
            });
        } catch (err) {
            callback(false, err);
        }
    }
}();

module.exports = MySQLController;