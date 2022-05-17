"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const moov_1 = require("./moov");
const slack_1 = require("./slack");
class Environment {
    constructor() {
        this.MoovService = new moov_1.MoovService();
        this.SlackService = new slack_1.SlackService();
    }
}
exports.Env = new Environment();
