"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const dotenv_1 = require("dotenv");
class Config {
    constructor() {
        this.moovApiUrl = "https://api.moov.io";
        this.port = 8080;
    }
    async loadFromEnv() {
        (0, dotenv_1.config)();
        this.slackToken = process.env.SLACK_TOKEN;
        this.slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
        this.slackChannel = process.env.SLACK_CHANNEL;
        this.moovApiUrl = process.env.MOOV_API_URL || "https://api.moov.io";
        this.moovPublicKey = process.env.MOOV_PUBLIC_KEY;
        this.moovSecretKey = process.env.MOOV_SECRET_KEY;
        this.moovWebhookSecret = process.env.MOOV_WEBHOOK_SECRET;
        this.port = +(process.env.PORT || this.port);
    }
    missingValues() {
        let missing = [];
        if (!this.slackToken)
            missing.push("SLACK_TOKEN");
        if (!this.slackSigningSecret)
            missing.push("SLACK_SIGNING_SECRET");
        if (!this.slackChannel)
            missing.push("SLACK_CHANNEL");
        if (!this.moovPublicKey)
            missing.push("MOOV_PUBLIC_KEY");
        if (!this.moovSecretKey)
            missing.push("MOOV_SECRET_KEY");
        if (!this.moovWebhookSecret)
            missing.push("MOOV_WEBHOOK_SECRET");
        return missing;
    }
}
exports.Config = Config;
const config = new Config();
exports.default = config;
