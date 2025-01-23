const fs = require('fs');

class StorageController {
    static getStoragePath(userid) {
        userid = `${userid}`;
        let path = 'UserData/';
        const pathSegments = userid.split('');
        for (const segment of pathSegments) {
            path += (segment + '/');
        }
        return path;
    }

    static createStorage(userid) {
        try {
            let path = StorageController.getStoragePath(userid);
            fs.mkdirSync(path, { recursive: true });
            fs.writeFileSync(path + 'basic_info.json', JSON.stringify({ 'userid': userid, 'buckets': 0 }));
            return true;
        } catch (e) {
            return false;
        }
    }

    static doesStorageExists(userid) {
        try {
            let path = StorageController.getStoragePath(userid) + 'basic_info.json';
            return fs.isExistsSync(path);
        } catch (e) {
            return false;
        }
    }

    static isUserAuthorized(userid) {
        try {
            let path = StorageController.getStoragePath(userid) + 'basic_info.json';
            let basic_info = JSON.parse(fs.readFileSync(path));
            return (basic_info['userid'] == userid);
        } catch (e) {
            return false;
        }
    }

    static createBucket(userid) {
        try {
            if (StorageController.isUserAuthorized(userid)) {
                let path = StorageController.getStoragePath(userid) + 'basic_info.json';
                let basic_info = JSON.parse(fs.readFileSync(path));
                basic_info['buckets']++;
                fs.mkdirSync(path + `B${basic_info['buckets']}`, { recursive: true });
                fs.writeFileSync(path, JSON.stringify(basic_info));
                return basic_info['buckets'];
            }
            return -1;
        } catch (e) {
            return 0;
        }
    }

    static isBucketExists(userid, bucket_id) {
        try {
            if (!StorageController.isUserAuthorized(userid)) {
                return false;
            }
            let path = StorageController.getStoragePath(userid) + `B${bucket_id}/`;
            return fs.existsSync(path);
        } catch (e) {
            return false;
        }
    }

    static createDirectoryInBucket(userid, bucket_id) {
        try {
            if (!StorageController.isBucketExists(userid, bucket_id)) {
                return false;
            }
            let path = StorageController.getStoragePath(userid) + `B${bucket_id}/`;
            fs.mkdirSync(path, { recursive: true });
            return true;
        } catch (e) {
            return false;
        }
    }
};

module.exports = StorageController;