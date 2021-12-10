"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const got_1 = __importDefault(require("got"));
const configuration = __importStar(require("../configuration"));
const buildGotErrorMessage_1 = __importDefault(require("../helpers/buildGotErrorMessage"));
const authentication_1 = require("../services/authentication");
(async () => {
    await configuration.load();
    const config = configuration.active();
    const url = `http://localhost:${configuration.active().port}/webhooks`;
    const timestamp = new Date().toISOString();
    const nonce = (0, crypto_1.randomUUID)();
    const webhookID = (0, crypto_1.randomUUID)();
    const signature = (0, authentication_1.generateSignature)(timestamp, nonce, webhookID);
    try {
        const res = await (0, got_1.default)({
            url,
            method: "POST",
            headers: {
                "x-timestamp": timestamp,
                "x-nonce": nonce,
                "x-webhook-id": webhookID,
                "x-signature": signature,
            },
            json: {
                eventID: (0, crypto_1.randomUUID)(),
                type: "transfer.updated",
                data: {
                    transferID: process.argv[2],
                    status: "failed",
                },
                createdOn: new Date().toISOString(),
            },
        });
        console.log(`Response: ${res.statusCode}`);
    }
    catch (err) {
        console.error(`sendTransferEvent failed: ${(0, buildGotErrorMessage_1.default)(err)}`);
        process.exit(1);
    }
})();
