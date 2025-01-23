const formidable = require('formidable');

class RequestData {
    #url;
    #data;

    constructor() {
        this.#url = [];
        this.#data = {};
    }

    extractData(req, callback) {
        try {
            let url = req.url;
            url = url.split('/');
            (url[0] == '') ? url.shift(1) : None;
            let temp = url[url.length - 1].split('?', 2);
            if (temp.length == 2 && temp[1] != '') {
                url[url.length - 1] = temp[0];
                try {
                    this.#data = JSON.parse(temp[1]);
                } catch (e) {
                    temp = temp[1].split('&');
                    for (let i = 0; i < temp.length; i++) {
                        let _temp = temp[i].split('=');
                        this.#data[_temp[0]] = _temp[1];
                    }
                }
            }
            this.#url = url;
            if (req.method === 'POST') {
                let data = '';
                req.on('data', chunk => {
                    data += chunk.toString();
                });
                req.on('end', () => {
                    try {
                        this.#data = JSON.parse(data);
                    }
                    catch (e) {
                        data = data.split('&');
                        for (let i = 0; i < data.length; i++) {
                            let _data = data[i].split('=');
                            this.#data[_data[0]] = _data[1];
                        }
                    }
                    callback();
                });
            }
            else {
                callback();
            }
        } catch (e) {
            console.log(e);
        }
    }

    shiftUrl() {
        return this.#url.shift();
    }

    getUrl(asArray = false) {
        if (asArray) {
            return this.#url;
        } else {
            return this.#url.join('/');
        }
    }

    getData(key = null) {
        if (key == null || this.#data[key] == undefined) {
            return this.#data;
        } else if (key != null) {
            return this.#data[key];
        }
    }
};

module.exports = RequestData;