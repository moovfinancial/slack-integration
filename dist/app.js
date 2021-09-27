"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.start = void 0;
const bolt_1 = require("@slack/bolt");
const express_1 = __importDefault(require("express"));
let app = null;
async function start(config) {
    const receiver = new bolt_1.ExpressReceiver({ signingSecret: config.slack.signingSecret });
    app = new bolt_1.App({ token: config.slack.token, receiver });
    app.action("inspectTransfer", () => Promise.resolve());
    receiver.router.use(express_1.default.json());
    receiver.router.use(express_1.default.urlencoded({ extended: true }));
    receiver.router.post("/webhook/transfer", () => Promise.resolve());
    receiver.router.get("/ping", async (_, res) => res.sendStatus(200));
    await app.start(config.port);
    console.log(`listening on port ${config.port}`);
}
exports.start = start;
function get() {
    return app;
}
exports.get = get;
