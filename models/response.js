const path = require('path');

class Responses {
    FAILED = 'FAILED';
    SUCCESS = 'SUCCESS';
    WRONG_PASSWORD = 'WRONG PASSWORD';
    ENTITY_NOT_FOUND = 'ENTITY NOT FOUND';
    USER_ALREADY_EXISTS = 'USER ALREADY EXISTS';
    SOMETHING_WENT_WRONG = 'SOMETHING WENT WRONG';
    USER_DOES_NOT_EXISTS = 'USER DOES NOT EXISTS';
};

class Response {
    #content
    #statusCode
    #contentType
    #contentTypes =
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

    #setContentTypeByFileName(fileName) {
        const fileext = path.extname(fileName);
        if (this.#contentTypes[fileext] != undefined) {
            this.#contentType = this.#contentTypes[fileext];
        }
    }

    #setContentTypeByFileExtension(fileext) {
        if (this.#contentTypes[fileext] != undefined) {
            this.#contentType = this.#contentTypes[fileext];
        }
    }

    constructor(statusCode = 404, contentType = 'text/plain', content = '', filename = '', fileext = '') {
        this.#content = content;
        this.#statusCode = statusCode;
        this.#contentType = contentType;
        if (filename != '') {
            this.#setContentTypeByFileName(filename);
        } else if (fileext != '') {
            this.#setContentTypeByFileExtension(fileext);
        }
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
};

module.exports = { Response, Responses };