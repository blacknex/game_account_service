const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

class REST {
	constructor(components, config) {
		this.userDB = components.userDB;
		this.tokenService = components.tokenService;
		this.api = express();
		this.api.use(bodyParser.json());
		this.api.use(cors());
		this.api.post("/create", (req, res) => this.create(req, res));
		this.api.post("/login", (req, res) => this.login(req, res));
		this.api.listen(config.port);
		console.log(`Listening on ${config.port}`);
	}

	async create(req, res) {
		try {
			if(!req.body.user) throw new Error("Username not set");
			if(!req.body.password) throw new Error("Password not set"); //Let's assume HTTPS
			let userId = await this.userDB.create(req.body.user, req.body.password);
			res.send({userId});
		} catch (err) {
			res.status(400).send(err.message);
		}
	}

	async login(req, res) {
		try {
			if(!req.body.user) throw new Error("Username not set");
			if(!req.body.password) throw new Error("Password not set"); //Let's assume HTTPS
			let userId = await this.userDB.login(req.body.user, req.body.password);
			//Create token
			let token = await this.tokenService.create(userId);
			res.send({token: token.token});
		} catch (err) {
			console.log(err);
			res.status(400).send(err.message);
		}
	}
}

module.exports = REST;