const fs = require('fs');

const StorageController = new class {
    #Bucket = class {
        #userid;
        #bucketid;

        constructor(userid, bucketid) {
            this.#userid = userid;
            this.#bucketid = bucketid;
        }

        #getBucketPath() {
            let userid = `${this.#userid}`;
            let bucketid = `${this.#bucketid}`;
            let path = 'UserData/';
            const pathSegments = userid.split('');
            for (const segment of pathSegments) {
                path += (segment + '/');
            }
            path += `B${bucketid}/`;
            return path;
        }

        createDirectory(name, path = '', recursive = true) {
            try {
                path = (this.#getBucketPath() + path + `${name}/`);
                fs.mkdirSync(path, { recursive: recursive });
                return true;
            } catch (e) {
                return false;
            }
        }

        insertFile(name, filepath, path = '', recursive = true) {
            try {
                path = (this.#getBucketPath() + (path != '') ? (path + '/') : path);
                fs.mkdirSync(path, { recursive: recursive });
                fs.copyFileSync(filepath, (path + name));
                return true;
            } catch (e) {
                return false;
            }
        }

        doesFileExists(name, path = '') {
            try {
                path = (this.#getBucketPath() + (path != '') ? (path + '/') : path);
                return fs.existsSync(path + name);
            } catch (e) {
                return false;
            }
        }
    };

    #getStoragePath(userid) {
        userid = `${userid}`;
        let path = 'UserData/';
        const pathSegments = userid.split('');
        for (const segment of pathSegments) {
            path += (segment + '/');
        }
        return path;
    }

    #isUserAuthorized(userid) {
        try {
            if (!this.#doesStorageExists(userid)) {
                return false;
            }
            let path = this.#getStoragePath(userid) + 'credentials.json';
            let basic_info = JSON.parse(fs.readFileSync(path));
            return (basic_info['userid'] == userid);
        } catch (e) {
            return false;
        }
    }

    #doesStorageExists(userid) {
        try {
            let path = this.#getStoragePath(userid) + 'credentials.json';
            return fs.existsSync(path);
        } catch (e) {
            return false;
        }
    }

    #isBucketExists(userid, bucket_id) {
        try {
            if (!this.#isUserAuthorized(userid)) {
                return false;
            }
            let path = this.#getStoragePath(userid) + `B${bucket_id}/`;
            return fs.existsSync(path);
        } catch (e) {
            return false;
        }
    }

    #createBucket(userid) {
        try {
            if (this.#isUserAuthorized(userid)) {
                let path = this.#getStoragePath(userid);
                let credentials = JSON.parse(fs.readFileSync(path + 'credentials.json'));
                credentials['buckets']++;
                fs.mkdirSync(path + `B${credentials['buckets']}`, { recursive: true });
                fs.writeFileSync(path + 'credentials.json', JSON.stringify(basic_info));
                return new this.#Bucket(userid, credentials['buckets']);
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    createStorage(userid) {
        try {
            if (this.#doesStorageExists(userid)) {
                return false;
            }
            let path = this.#getStoragePath(userid);
            fs.mkdirSync(path, { recursive: true });
            fs.writeFileSync(path + 'credentials.json', JSON.stringify({ 'userid': userid, 'buckets': 0 }));
            return true;
        } catch (e) {
            return false;
        }
    }

    getBucket(userid, bucket_id) {
        try {
            if (this.#isUserAuthorized(userid) && this.#isBucketExists(userid, bucket_id)) {
                return new this.#Bucket(userid, bucket_id);
            } else if (this.#isUserAuthorized(userid)) {
                return this.#createBucket(userid);
            }
            return null;
        } catch (e) {
            return null;
        }
    }
}();

module.exports = StorageController;