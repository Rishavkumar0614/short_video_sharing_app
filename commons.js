const bcrypt = require('bcrypt');

function hash_string(string) {
    const saltRounds = 10;
    return bcrypt.hashSync(string, saltRounds);
}

module.exports = { hash_string };