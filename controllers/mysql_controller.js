const mysql = require('mysql');

class MySQLController {
    static connect(callback, user = 'short_video_sharing_app', password = 'Rishav@kumar14', hostname = 'localhost', port = 3306) {
        try {
            const connection = mysql.createConnection({
                port: port,
                user: user,
                host: hostname,
                password: password,
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
};

module.exports = MySQLController;