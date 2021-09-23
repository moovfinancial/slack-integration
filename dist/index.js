"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bolt_1 = require("@slack/bolt");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
(async () => {
    await config_1.default.loadFromEnv();
    const missingValues = config_1.default.missingValues();
    if (missingValues.length) {
        await startEmptyApp(config_1.default, missingValues);
    }
    else {
        await startSlackApp(config_1.default);
    }
    console.log(`listening on port ${config_1.default.port}`);
})();
/**
 * Start a server that simply reports which configuration values are missing.
 */
async function startEmptyApp(config, missingValues) {
    console.error(`missing configuration values: ${missingValues.join(", ")}`);
    const app = (0, express_1.default)();
    app.get("/ping", async (_, res) => res.sendStatus(200));
    await app.listen(config.port);
}
/**
 * Start the Moov Slack server.
 */
async function startSlackApp(config) {
    console.log("configuration values loaded");
    const receiver = new bolt_1.ExpressReceiver({ signingSecret: config.slackSigningSecret });
    const app = new bolt_1.App({
        token: config.slackToken,
        receiver,
    });
    app.action("inspectTransfer", () => Promise.resolve());
    receiver.router.use(express_1.default.json());
    receiver.router.use(express_1.default.urlencoded({ extended: true }));
    receiver.router.post("/webhook/slack", () => Promise.resolve());
    receiver.router.get("/ping", async (_, res) => res.sendStatus(200));
    await app.start(config.port);
}
