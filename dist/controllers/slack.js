"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveWebhookEvent = void 0;
const authentication_1 = require("../services/authentication");
async function receiveWebhookEvent(req, res) {
    console.log(`receiveWebhookEvent: `, req.body);
    if ((0, authentication_1.signatureIsValid)(req.headers)) {
        // TODO: parse event
    }
    else {
        console.warn(`receiveWebhookEvent: invalid signature`);
    }
    res.sendStatus(200);
}
exports.receiveWebhookEvent = receiveWebhookEvent;
