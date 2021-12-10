"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhookEvent = void 0;
const authentication_1 = require("../services/authentication");
const slack_1 = require("../services/slack");
async function handleWebhookEvent(req, res) {
    var _a;
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
    const type = (_a = req.body) === null || _a === void 0 ? void 0 : _a.type;
    if (type.startsWith("transfer")) {
        handleTransferEvent(type, req.body);
    }
    // TODO: Add additional event handlers here
    res.sendStatus(200);
}
exports.handleWebhookEvent = handleWebhookEvent;
async function handleTransferEvent(type, body) {
    var _a, _b;
    // Ensure it's a recognized event
    let recognized = false;
    if (type === "transfer.created") {
        recognized = true;
    }
    else if (type === "transfer.updated") {
        if (body.status === "failed" || body.status === "reversed" || body.status === "completed") {
            recognized = true;
        }
    }
    if (recognized) {
        // Send the message
        const transferID = ((_a = body.data) === null || _a === void 0 ? void 0 : _a.transferID) || ((_b = body.data) === null || _b === void 0 ? void 0 : _b.TransferID);
        await (0, slack_1.sendTransferMessage)(type, transferID);
    }
}
