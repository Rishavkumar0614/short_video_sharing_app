const path = require('path');

class Response {
    #content
    #statusCode
    #contentType
    static contentTypes =
        {
            ".css": 'text/css',
            ".png": 'image/png',
            ".jpg": 'image/jpg',
            ".jpeg": 'image/jpg',
            ".html": 'text/html',
            ".txt": 'text/plain',
            ".js": 'text/javascript',
            ".json": 'application/json',
            ".wasm": 'application/wasm',
            ".otf": 'application/x-font-otf',
            ".ttf": 'application/x-font-ttf',
        };

    constructor(statusCode = 404, contentType = 'text/plain', content = '') {
        this.#content = content;
        this.#statusCode = statusCode;
        this.#contentType = contentType;
    }

    getStatusCode() {
        return this.#statusCode;
    }

    getContentType() {
        return this.#contentType;
    }

    getContent() {
        return this.#content;
    }

    setContentTypeByFileName(fileName) {
        const fileext = path.extname(fileName);
        if (Response.contentTypes[fileext] != undefined) {
            this.#contentType = Response.contentTypes[fileext];
        }
    }

    static getContentTypeByFileName(fileName) {
        const fileext = path.extname(fileName);
        if (Response.contentTypes[fileext] != undefined) {
            return Response.contentTypes[fileext];
        }
        else {
            return '';
        }
    }
};

module.exports = Response;