const bcrypt = require('bcrypt');

const Encryption = new class {
    #salt;
    #passphrase;

    #stringToArrayBuffer(string) {
        return new TextEncoder().encode(string);
    }

    #arrayBufferToString(buffer) {
        return new TextDecoder().decode(buffer);
    }

    async #getKeyFromPassphrase(passphrase) {
        const encoder = new TextEncoder();
        const passphraseKey = encoder.encode(passphrase);

        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passphraseKey,
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        );

        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: encoder.encode(this.#salt),
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );

        return key;
    }

    constructor() {
        this.#passphrase = 'Kumar@Rishav14';
        this.#salt = bcrypt.hashSync(this.#passphrase, 10);
    }

    encrypt_string(string, callback) {
        (async () => {
            try {
                const key = await this.#getKeyFromPassphrase(this.#passphrase);
                const iv = crypto.getRandomValues(new Uint8Array(12));
                const encodedString = this.#stringToArrayBuffer(string);

                const encryptedBuffer = await crypto.subtle.encrypt(
                    {
                        name: 'AES-GCM',
                        iv: iv
                    },
                    key,
                    encodedString
                );

                const combinedBuffer = new Uint8Array(iv.byteLength + encryptedBuffer.byteLength);
                combinedBuffer.set(iv, 0);
                combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.byteLength);

                const encryptedString = btoa(String.fromCharCode(...combinedBuffer));

                callback(true, encryptedString);
            } catch (error) {
                callback(false, `Encryption failed: ${error}`);
            }
        })();
    }

    $encrypt_string(string) {
        return bcrypt.hashSync(string, 10);
    }

    decrypt_string(encryptedString, callback) {
        (async () => {
            try {
                const key = await this.#getKeyFromPassphrase(this.#passphrase);

                const combinedBuffer = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));

                const iv = combinedBuffer.slice(0, 12);
                const encryptedData = combinedBuffer.slice(12);

                const decryptedBuffer = await crypto.subtle.decrypt(
                    {
                        name: 'AES-GCM',
                        iv: iv
                    },
                    key,
                    encryptedData
                );

                const decryptedString = this.#arrayBufferToString(decryptedBuffer);
                callback(true, decryptedString);
            } catch (error) {
                console.log(error);
                callback(false, `Decryption failed: ${error}`);
            }
        })();
    }
}();

module.exports = Encryption;
