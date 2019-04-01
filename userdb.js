class UserDB {
    constructor(config) {
        this.users = [];
    }

    async create(user, pass) {
        let found = this.users.filter(u => u.user === user);
        if(found.length > 0) throw new Error("User already exists!");
        let newUser = {
            user,
            pass,
            userId: parseInt(Math.random()*1000000)
        }
        this.users.push(newUser);
        return newUser.userId;
    }

    async login(user, pass) {
        let found = this.users.filter(u => u.user === user && u.pass === pass);
        if(found.length < 1) throw new Error("Credentials wrong");
        return found[0].userId;
    }
}
module.exports = UserDB;