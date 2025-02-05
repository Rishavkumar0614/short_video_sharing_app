const formidable = require('formidable');

class RequestData {
    #url;
    incomingData;

    constructor() {
        this.#url = [];
        this.incomingData = class {
            #files;
            #fields;

            constructor(fields, files) {
                this.#files = files;
                this.#fields = fields;
            }

            getField(key) {
                return this.#fields[key];
            }

            checkFields(keys) {
                for (let key in keys) {
                    if (!this.getField(key)) {
                        return false;
                    }
                }
                return true;
            }

            getFile(filename) {
                return this.#files[filename];
            }

            getFiles() {
                let files = [];
                for (let file in this.#files) {
                    files.push({ 'filename': file, 'filepath': this.#files[file] });
                }
                return files;
            }

            getFileNames() {
                let files = [];
                for (let file in this.#files) {
                    files.push(file);
                }
                return files;
            }

            getFilePaths() {
                let files = [];
                for (let file in this.#files) {
                    files.push(this.#files[file]);
                }
                return files;
            }
        };
    }

    extractData(req, callback) {
        try {
            let url = req.url;
            url = url.split('?', 2)[0];
            url = url.split('/');
            (url[0] == '') ? url.shift(1) : None;
            this.#url = url;
            let $fields = {}, $files = {};
            new formidable.IncomingForm().parse(req, (err, fields, files) => {
                if (req.headers['content-type'].includes('multipart/form-data')) {
                    for (let file in files) {
                        $files[files[file][0].originalFilename] = files[file][0].filepath;
                    }
                    for (let field in fields) {
                        $fields[field] = fields[field][0];
                    }
                    this.incomingData = new this.incomingData($fields, $files);
                    callback(true);
                }
            });
            let $req = req;
            if ($req.method === 'GET') {
                $req = $req.url.split('?', 2);
                if ($req.length > 1) {
                    let data = JSON.parse($req[1]);
                    for (let key in data) {
                        $fields[key] = data[key];
                    }
                    this.incomingData = new this.incomingData($fields, $files);
                }
                callback(true);
            }
            else if ($req.method === 'POST') {
                if (!$req.headers['content-type'].includes('multipart/form-data')) {
                    let data = '';
                    $req.on('data', chunk => {
                        data += chunk.toString();
                    });
                    $req.on('end', () => {
                        data = JSON.parse(data);
                        for (let key in data) {
                            $fields[key] = data[key];
                        }
                        this.incomingData = new this.incomingData($fields, $files);
                        callback(true);
                    });
                }
            }
        } catch (e) {
            callback(false);
        }
    }

    peekUrl(asString = false, completeUrl = false, n = 1) {
        let url = [];
        if (completeUrl || n > this.#url.length) {
            n = this.#url.length;
        }
        for (let i = 0; i < n; i++) {
            url.push(this.#url[i]);
        }
        if (asString) {
            return url.join('/');
        }
        return url;
    }

    popUrl(asString = false, completeUrl = false, n = 1) {
        let url = [];
        if (completeUrl || n > this.#url.length) {
            n = this.#url.length;
        }
        for (let i = 0; i < n; i++) {
            url.push(this.#url[i]);
        }
        if (n <= this.#url.length) {
            this.#url = this.#url.slice(n);
        }
        if (asString) {
            return url.join('/');
        }
        return url;
    }
};

module.exports = RequestData;