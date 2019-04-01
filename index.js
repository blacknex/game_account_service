const REST = require("./rest.js");
const config = require("./config.json");
const UserDB = require("./userdb.js");
const TokenService = require("./tokenservice.js");
class AccountService {
    constructor() {
        this.init();
    }

    async init() {
        this.userDB = new UserDB(config.userDB);
        this.tokenService = new TokenService(config.tokenService);
        this.rest = new REST({userDB: this.userDB, tokenService: this.tokenService}, config.rest);
    }
}

new AccountService();