"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = void 0;
const application = __importStar(require("../application"));
const configuration = __importStar(require("../configuration"));
const message_1 = require("./message");
const env_1 = require("./env");
class SlackService {
    async sendTransferMessage(type, transferID) {
        try {
            const config = configuration.active();
            const transferData = await env_1.Env.MoovService.getTransferData(transferID);
            const blocks = (0, message_1.transferMessage)(type, transferData);
            const app = application.active();
            await app.client.chat.postMessage({
                channel: config.slack.channel,
                blocks,
            });
        }
        catch (err) {
            console.error(`slack.sendTransferMessage failed: `, (err === null || err === void 0 ? void 0 : err.message) || err);
        }
    }
    async showTransferDetails({ body, client, ack }) {
        try {
            await ack();
            const config = configuration.active();
            const transferData = await env_1.Env.MoovService.getTransferData(body.actions[0].value);
            const view = (0, message_1.transferDetails)(transferData);
            await client.views.open({
                trigger_id: body.trigger_id,
                view,
            });
        }
        catch (err) {
            console.error(`slack.showTransferDetails failed: `, (err === null || err === void 0 ? void 0 : err.message) || err);
        }
    }
}
exports.SlackService = SlackService;
