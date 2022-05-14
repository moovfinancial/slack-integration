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
exports.handleWebhookEvent = void 0;
const authentication_1 = require("../services/authentication");
const env_1 = require("../services/env");
const CNT = __importStar(require("../constants"));
const eventMap = {};
eventMap[CNT.TRANSFER_CREATED] = handleTransfer;
eventMap[CNT.TRANSFER_UPDATED] = handleTransfer;
async function handleWebhookEvent(req, res) {
    if (!(0, authentication_1.signatureIsValid)(req.headers)) {
        const headers = {};
        ["x-timestamp", "x-nonce", "x-webhook-id", "x-signature"].forEach((key) => {
            headers[key] = req.headers[key] || "";
        });
        console.warn(`handleWebhookEvent: invalid signature: headers:`, headers);
        res.sendStatus(403);
        return;
    }
    console.log(`handleWebhookEvent: `, req.body);
    const event = req.body.type;
    const handler = eventMap[event];
    if (handler) {
        try {
            await handler(event, req.body);
        }
        catch (err) {
            console.error("handleWebhookEvent: handler failed: ", (err === null || err === void 0 ? void 0 : err.message) || err);
        }
    }
    res.sendStatus(200);
}
exports.handleWebhookEvent = handleWebhookEvent;
async function handleTransfer(type, body) {
    var _a, _b, _c, _d;
    if (type === CNT.TRANSFER_UPDATED &&
        ((_a = body.data) === null || _a === void 0 ? void 0 : _a.status) !== CNT.TRANSFER_STATUS_COMPLETED &&
        ((_b = body.data) === null || _b === void 0 ? void 0 : _b.status) !== CNT.TRANSFER_STATUS_REVERSED)
        return;
    const transferID = ((_c = body.data) === null || _c === void 0 ? void 0 : _c.transferID) || ((_d = body.data) === null || _d === void 0 ? void 0 : _d.TransferID);
    await env_1.Env.SlackService.sendTransferMessage(type, transferID);
}
