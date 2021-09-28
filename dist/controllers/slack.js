"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSlackEvent = void 0;
async function handleSlackEvent(req, res) {
    var _a;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.payload)) {
        console.warn("handleSlackEvent: unexpected request body: ", req.body);
        return;
    }
    const payload = JSON.parse(req.body.payload);
    console.log("handleSlackEvent: ", payload);
    if (payload.actions.any((action) => action.action_id === "inspectTransfer")) {
    }
    res.sendStatus(200);
}
exports.handleSlackEvent = handleSlackEvent;
