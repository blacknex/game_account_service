const axios = require("axios");

class TokenService {
    constructor(config) {
        this.uri = config.uri;
        this.tokens = [];
    }

    async create(userId) {
        let res = await axios.post(`${this.uri}/create`, {userId});
        return res.data;
    }

    async check(userId, token) {
       let res = await axios.post(`${this.uri}/check`, {token});
       return true;
    }
}

module.exports = TokenService;