const StorageController = require("../../controllers/storage_controller.js");

class StreamService {
    stream(userid, contentid) {
        try {
            let bucket = StorageController.getBucket(userid, 1);
            if (bucket && bucket.doesFileExists(`${contentid}.mp4`, 'contents')) {
                
            } else {
                callback('SOMETHING WENT WRONG');
            }
        } catch (e) {
            callback('SOMETHING WENT WRONG');
        }
    }
};