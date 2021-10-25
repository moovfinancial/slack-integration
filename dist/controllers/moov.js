"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhookEvent = void 0;
const authentication_1 = require("../services/authentication");
const slack_1 = require("../services/slack");
const eventMap = {
    "transfer.created": handleTransferEvent,
    "transfer.updated": handleTransferEvent,
    // --> Add additional event handlers here
};
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
async function handleTransferEvent(type, body) {
    var _a, _b, _c;
    if (type === "transfer.updated" && ((_a = body.data) === null || _a === void 0 ? void 0 : _a.status) !== "completed")
        return;
    const transferID = ((_b = body.data) === null || _b === void 0 ? void 0 : _b.transferID) || ((_c = body.data) === null || _c === void 0 ? void 0 : _c.TransferID);
    await (0, slack_1.sendTransferMessage)(type, transferID);
}
