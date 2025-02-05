const path = require('path');
const MySQLController = require('../../controllers/mysql_controller.js');
const StorageController = require('../../controllers/storage_controller.js');

/*
    Code Review:
    Review #1: 24/01/2025
    Review #2: 25/01/2025
*/

const ContentService = new class {
    upload(userid, filename, filepath, caption, callback) {
        try {
            MySQLController.connect((status, result) => {
                if (status) {
                    let connectionObj = result;
                    connectionObj.query(`
                    USE short_video_sharing_app;
                    SELECT * FROM contents WHERE userid = ${userid};
                    `, (err, result) => {
                        if (err) {
                            callback('SOMETHING WENT WRONG');
                            connectionObj.end();
                        } else {
                            let contentid = (result.length + 1);
                            connectionObj.query(`
                                USE short_video_sharing_app;
                                INSERT INTO contents (userid, contentid, caption) VALUES (${userid}, ${contentid}, '${caption}');
                                `, (err, result) => {
                                if (err) {
                                    callback('SOMETHING WENT WRONG');
                                } else {
                                    let bucket = StorageController.getBucket(userid, 1);
                                    if (bucket.createDirectory('contents') && bucket.insertFile(`${contentid}${path.extname(filename)}`, filepath, `contents`)) {
                                        callback('CONTENT UPLOADED');
                                    } else {
                                        callback('SOMETHING WENT WRONG');
                                    }
                                }
                                connectionObj.end();
                            });
                        }
                    });
                } else {
                    callback('SOMETHING WENT WRONG');
                }
            });
        } catch (e) {
            callback('SOMETHING WENT WRONG');
        }
    }

    fetch(userid, contentid) {
        try {
            MySQLController.connect((status, result) => {
                if (status) {
                    let connectionObj = result;
                    connectionObj.query(`
                        USE short_video_sharing_app;
                        SELECT * FROM contents WHERE userid = ${userid} AND contentid = ${contentid};
                        `, (err, result) => {
                        if (err) {
                            callback('SOMETHING WENT WRONG');
                        } else {
                            if (result.length > 0) {
                                
                            } else {
                                callback('CONTENT DOES NOT EXISTS');
                            }
                        }
                    });
                } else {
                    callback('SOMETHING WENT WRONG');
                }
            });
        } catch (e) {
            callback('SOMETHING WENT WRONG');
        }
    }
}();

module.exports = ContentService;