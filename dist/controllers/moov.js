"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhookEvent = void 0;
const authentication_1 = require("../services/authentication");
const slack_1 = require("../services/slack");
async function handleWebhookEvent(req, res) {
    var _a;
    if (!(0, authentication_1.signatureIsValid)(req.headers)) {
        console.warn(`receiveWebhookEvent: invalid signature`);
        return;
    }
    console.log(`handleWebhookEvent: `, req.body);
    switch ((_a = req.body) === null || _a === void 0 ? void 0 : _a.type) {
        case "transfer.updated":
            await handleTransferEvent(req.body);
            break;
    }
    res.sendStatus(200);
}
exports.handleWebhookEvent = handleWebhookEvent;
async function handleTransferEvent(body) {
    var _a, _b;
    const transferID = (_a = body.data) === null || _a === void 0 ? void 0 : _a.transferID;
    const status = (_b = body.data) === null || _b === void 0 ? void 0 : _b.status;
    if (status === "completed") {
        await (0, slack_1.sendTransferMessage)(transferID);
    }
}
