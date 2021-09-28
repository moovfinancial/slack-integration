"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhookEvent = void 0;
const authentication_1 = require("../services/authentication");
const slack_1 = require("../services/slack");
async function handleWebhookEvent(req, res) {
    if (!(0, authentication_1.signatureIsValid)(req.headers)) {
        console.warn(`receiveWebhookEvent: invalid signature`);
        return;
    }
    console.log(`handleWebhookEvent: `, req.body);
    const type = req.body.type;
    if (type === "transfer.created" || type === "transfer.updated") {
        await handleTransferEvent(type, req.body);
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
