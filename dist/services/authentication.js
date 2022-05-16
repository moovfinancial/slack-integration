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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = exports.signatureIsValid = void 0;
const crypto = __importStar(require("crypto"));
const configuration_1 = require("../configuration");
function signatureIsValid(headers) {
    const config = (0, configuration_1.active)();
    const timestamp = headers["x-timestamp"];
    const nonce = headers["x-nonce"];
    const webhookID = headers["x-webhook-id"];
    const signature = headers["x-signature"];
    const payload = `${timestamp}|${nonce}|${webhookID}`;
    const checkHash = crypto
        .createHmac("sha512", config.moov.webhookSecret)
        .update(payload)
        .digest("hex");
    return signature === checkHash;
}
exports.signatureIsValid = signatureIsValid;
function generateSignature(timestamp, nonce, webhookID) {
    const config = (0, configuration_1.active)();
    const payload = `${timestamp}|${nonce}|${webhookID}`;
    const signature = crypto
        .createHmac("sha512", config.moov.webhookSecret)
        .update(payload)
        .digest("hex");
    return signature;
}
exports.generateSignature = generateSignature;
